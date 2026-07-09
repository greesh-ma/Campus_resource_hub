const { getDB } = require('./config/db');

const initializeCollections = async () => {
  const db = getDB();

  try {
    // Create users collection
    const users = db.collection('users');
    await users.createIndex({ email: 1 }, { unique: true });

    // Create resources collection
    const resources = db.collection('resources');
    await resources.createIndex({ createdAt: -1 });
    await resources.createIndex({ userId: 1 });

    // Create votes collection
    const votes = db.collection('votes');
    await votes.createIndex({ resourceId: 1, userId: 1 }, { unique: true });
    await votes.createIndex({ resourceId: 1 });

    console.log('Collections initialized successfully');
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
};

const getCollections = () => {
  const db = getDB();
  return {
    users: db.collection('users'),
    resources: db.collection('resources'),
    votes: db.collection('votes')
  };
};

module.exports = { initializeCollections, getCollections };
