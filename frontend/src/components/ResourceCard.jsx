

import { useState } from 'react';
import { resourceAPI } from '../api/client';
import { isAuthenticated } from '../utils/auth';

function ResourceCard({ resource, onVote }) {
  const [voted, setVoted] = useState(false);
  const [upvotes, setUpvotes] = useState(resource.upvotes || 0);
  const [loading, setLoading] = useState(false);

  // ✅ Subject code → name mapping
  const subjectMap = {
    CSE3006: 'Database Management System',
    CSE2001: 'Data Structures',
    CSE3005: 'Operating Systems',
    CSE3004: 'Computer Networks',
    CSE4003: 'Machine Learning',
    CSE4001: 'Artificial Intelligence',
    CSE2006: 'Web Development',
    CSE3001: 'Software Engineering',
    CSE4002: 'Cloud Computing',
    CSE4005: 'Cyber Security',

  };

  const handleVote = async () => {
    if (!isAuthenticated()) {
      alert('Please login to vote');
      return;
    }

    if (voted) {
      alert('You have already voted on this resource');
      return;
    }

    setLoading(true);

    try {
      const response = await resourceAPI.voteResource(resource._id);
      setUpvotes(response.upvotes);
      setVoted(true);

      if (onVote) {
        onVote(resource._id);
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="card-title">{resource.title}</div>

      <div className="card-description">{resource.description}</div>

      <div className="card-meta">
        {/* ✅ Updated category display */}
        <span className="card-category">
          {subjectMap[resource.category]
            ? `${subjectMap[resource.category]} (${resource.category})`
            : resource.category}
        </span>

        <span>{formatDate(resource.createdAt)}</span>
      </div>

      {resource.link && (
        <div style={{ marginBottom: '15px' }}>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff' }}
          >
            View Resource →
          </a>
        </div>
      )}

      <div className="card-footer">
        <button
          className={`upvote-btn ${voted ? 'voted' : ''}`}
          onClick={handleVote}
          disabled={loading}
        >
          ▲ {upvotes} {upvotes === 1 ? 'vote' : 'votes'}
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;
