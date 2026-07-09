# Campus Resource Hub

A **full-stack web application** that enables students to discover, share, and organize campus learning resources in one place. The platform provides secure user authentication, resource sharing, voting, and ranking features to help students easily access high-quality educational content.

## 📌 Features
- 🔐 Secure User Authentication (JWT)
- 📚 Share and Discover Learning Resources
- 👍 Upvote Resources
- 📊 Resource Ranking Algorithm
- 📄 Pagination for Resources
- 🛡 Protected Routes
- 🏷 Resource Categories
- 📱 Responsive User Interface

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt



## 📁 Project Structure

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
npm start
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

## 📷 Screenshots

### 🏠 Home Page

![Home](screenshots/Home.png)

### 🔐 Login Page

![Login](screenshots/Login.png)

### 📝 Sign Up Page

![Signup](screenshots/Signup.png)

### ➕ Add Resource

![Add Resource](screenshots/AddResource.png)

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/me` | Current User |

### Resources

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/resources?page=1&limit=10` | Get Resources |
| POST | `/api/resources` | Add Resource |
| POST | `/api/resources/:id/vote` | Vote Resource |



## Development Notes

- JWT tokens are stored in localStorage on the client
- Backend validates tokens on protected endpoints
- All passwords are hashed with bcrypt
- MongoDB indexes are created automatically on startup
- CORS is configured to allow requests from the frontend

## 🗄 Database Collections

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

## 💡 Ranking Algorithm

Resources are ranked using:

```
Score = Upvotes / (Days Since Posted + 1)
```

This ensures newer, high-quality resources appear higher while still rewarding popular content.

---
## 🎯 Skills Demonstrated

- Full Stack Web Development
- React.js
- Express.js
- Node.js
- MongoDB
- REST API Development
- JWT Authentication
- CRUD Operations
- Database Design
- API Integration
- Responsive UI Design
- Git & GitHub

---
## Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running and MONGODB_URI is correct in `.env`

**CORS Error**: Check that FRONTEND_URL in backend `.env` matches your frontend URL

**Port Already in Use**: Change the PORT in backend `.env` or terminate the process using that port

## 📄 License

This project is licensed under the **MIT License**.