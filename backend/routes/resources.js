const express = require('express');
const { getCollections } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { ObjectId } = require('mongodb');

const router = express.Router();

// ===============================
// GET RESOURCES (WITH SUBJECT FILTER + TRENDING FIX)
// ===============================
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortType = req.query.sort || 'trending';
    const subject = req.query.subject || 'ALL';

    let sortStage = { score: -1 };

    if (sortType === 'newest') {
      sortStage = { createdAt: -1 };
    } else if (sortType === 'mostVoted') {
      sortStage = { upvotes: -1 };
    }

    const { resources } = getCollections();

    // ✅ SUBJECT FILTER
    const matchStage =
      subject.toUpperCase() !== 'ALL'
        ? { $match: { category: subject.toUpperCase() } }
        : { $match: {} };

    const resourceList = await resources
      .aggregate([
        matchStage,

        {
          $lookup: {
            from: 'votes',
            localField: '_id',
            foreignField: 'resourceId',
            as: 'votes'
          }
        },

        // ✅ FIXED TRENDING FORMULA
        {
          $addFields: {
            upvotes: { $size: '$votes' },

            score: {
              $divide: [
                { $add: [{ $size: '$votes' }, 1] }, // upvotes + 1
                {
                  $sqrt: {
                    $add: [
                      {
                        $divide: [
                          { $subtract: [new Date(), '$createdAt'] },
                          1000 * 60 * 60 * 24
                        ]
                      },
                      2 // days + 2
                    ]
                  }
                }
              ]
            }
          }
        },

        { $sort: sortStage },
        { $skip: skip },
        { $limit: limit },
        { $project: { votes: 0 } }
      ])
      .toArray();

    const total = await resources.countDocuments(
      subject.toUpperCase() !== 'ALL'
        ? { category: subject.toUpperCase() }
        : {}
    );

    const totalPages = Math.ceil(total / limit);

    res.json({
      resources: resourceList,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===============================
// CREATE RESOURCE
// ===============================
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, link, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and description are required'
      });
    }

    const { resources } = getCollections();

    const result = await resources.insertOne({
      title,
      description,
      link: link || '',
      category: (category || 'GENERAL').toUpperCase(),
      userId: new ObjectId(req.userId),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      message: 'Resource created successfully',
      resource: {
        _id: result.insertedId,
        title,
        description,
        link,
        category,
        upvotes: 0,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===============================
// VOTE ON RESOURCE
// ===============================
router.post('/:id/vote', authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;
    const userId = req.userId;

    if (!ObjectId.isValid(resourceId)) {
      return res.status(400).json({ error: 'Invalid resource ID' });
    }

    const { resources, votes } = getCollections();

    const resource = await resources.findOne({
      _id: new ObjectId(resourceId)
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    const existingVote = await votes.findOne({
      resourceId: new ObjectId(resourceId),
      userId: new ObjectId(userId)
    });

    if (existingVote) {
      return res.status(400).json({
        error: 'You have already voted on this resource'
      });
    }

    await votes.insertOne({
      resourceId: new ObjectId(resourceId),
      userId: new ObjectId(userId),
      createdAt: new Date()
    });

    const voteCount = await votes.countDocuments({
      resourceId: new ObjectId(resourceId)
    });

    res.json({
      message: 'Vote added successfully',
      upvotes: voteCount
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;