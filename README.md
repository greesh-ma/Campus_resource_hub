# Campus Resource Hub

A full-stack web application for sharing and discovering campus learning resources. Built with React, Express.js, and MongoDB.

## Project Structure

```
/backend  - Express.js server
/frontend - React.js client
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/campus-hub
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Start MongoDB** (if using local MongoDB):
```bash
mongod
```

**Start the backend server**:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### 2. Frontend Setup

In a new terminal, navigate to the frontend directory:
```bash
cd frontend
npm install
```

**Start the development server**:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Features

- **User Authentication**: Sign up, login with JWT tokens
- **Resource Sharing**: Create and share learning resources
- **Ranking Algorithm**: Resources ranked by upvotes and recency (score = upvotes / (days + 1))
- **Voting System**: Upvote resources to help others discover valuable content
- **Pagination**: Browse resources with paginated results
- **Protected Routes**: Add resources only when authenticated
- **Categories**: Organize resources by category (Tutorial, Documentation, Tool, etc.)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (protected)

### Resources
- `GET /api/resources?page=1&limit=10` - Get paginated resources
- `POST /api/resources` - Create new resource (protected)
- `POST /api/resources/:id/vote` - Vote on a resource (protected)

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt

**Frontend:**
- React.js
- React Router DOM
- Vite
- Plain CSS

## Development Notes

- JWT tokens are stored in localStorage on the client
- Backend validates tokens on protected endpoints
- All passwords are hashed with bcrypt
- MongoDB indexes are created automatically on startup
- CORS is configured to allow requests from the frontend

## Database Collections

### users
- `_id` - ObjectId
- `email` - String (unique)
- `name` - String
- `password` - String (hashed)
- `createdAt` - Date

### resources
- `_id` - ObjectId
- `title` - String
- `description` - String
- `link` - String (optional)
- `category` - String
- `userId` - ObjectId (reference to user)
- `createdAt` - Date
- `updatedAt` - Date

### votes
- `_id` - ObjectId
- `resourceId` - ObjectId (reference to resource)
- `userId` - ObjectId (reference to user)
- `createdAt` - Date

## Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running and MONGODB_URI is correct in `.env`

**CORS Error**: Check that FRONTEND_URL in backend `.env` matches your frontend URL

**Port Already in Use**: Change the PORT in backend `.env` or terminate the process using that port

## License

MIT
