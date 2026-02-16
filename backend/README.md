# ORATO Dashboard Backend

Node.js backend API for the ORATO English Learning Dashboard.

## Features

- **Authentication**: JWT-based auth with access and refresh tokens
- **User Management**: Profile, settings, progress tracking
- **Dashboard Data**: Stats, lessons, challenges, skills, achievements
- **RESTful API**: Clean, well-structured endpoints
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Joi schema validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: Joi
- **Logging**: Morgan

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation middleware
│   ├── models/          # Data models (mock data for now)
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── config/              # Configuration files
├── package.json
└── README.md
```

## Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d
```

## Running the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get full dashboard data |
| GET | `/api/dashboard/stats` | Get user stats only |
| GET | `/api/dashboard/continue-learning` | Get continue learning lessons |
| GET | `/api/dashboard/challenges` | Get daily challenges |
| GET | `/api/dashboard/skills` | Get skill progress |
| GET | `/api/dashboard/achievements` | Get recent achievements |
| GET | `/api/dashboard/activity` | Get activity history |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/avatar` | Update avatar |
| GET | `/api/users/progress` | Get learning progress |
| GET | `/api/users/settings` | Get user settings |
| PUT | `/api/users/settings` | Update settings |
| DELETE | `/api/users/account` | Delete account |

### Lessons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lessons` | Get all lessons |
| GET | `/api/lessons/categories` | Get lesson categories |
| GET | `/api/lessons/recommended` | Get recommended lessons |
| GET | `/api/lessons/:id` | Get lesson by ID |
| PUT | `/api/lessons/:id/progress` | Update lesson progress |
| POST | `/api/lessons/:id/start` | Start a lesson |

### Challenges
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/challenges` | Get all challenges |
| GET | `/api/challenges/today` | Get today's summary |
| GET | `/api/challenges/:id` | Get challenge by ID |
| PUT | `/api/challenges/:id/progress` | Update challenge progress |
| POST | `/api/challenges/:id/increment` | Increment progress |
| POST | `/api/challenges/refresh` | Refresh daily challenges |

### Achievements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/achievements` | Get user's achievements |
| GET | `/api/achievements/all` | Get all available achievements |
| GET | `/api/achievements/progress` | Get achievement progress |
| GET | `/api/achievements/recent` | Get recent achievements |
| GET | `/api/achievements/:id` | Get achievement by ID |
| POST | `/api/achievements/:id/unlock` | Unlock an achievement |

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "status": "success",
  "message": "Optional message",
  "data": { ... }
}
```

Error responses:

```json
{
  "status": "error",
  "message": "Error description"
}
```

## Mock Data

Currently using mock data in `src/models/mockData.js`. To connect to a real database:

1. Install your database driver (e.g., `mongoose` for MongoDB or `pg` for PostgreSQL)
2. Create database connection in `config/database.js`
3. Replace mock data queries with actual database queries

## Connecting to Frontend

Update your frontend API base URL to point to the backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Testing

```bash
# Run tests
npm test
```

## License

MIT
