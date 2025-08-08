# RICT (Restart ICT) Admin Platform

A comprehensive admin dashboard for managing Telegram bot communications and user registrations.

## 🏗️ System Architecture

The RICT platform consists of two main components:

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB Atlas
- **Features**: 
  - REST API endpoints for admin operations
  - Telegram bot integration
  - User management
  - Broadcast messaging system
  - Registration status control

### Frontend (Angular)
- **Framework**: Angular 19 with TypeScript
- **Styling**: Tailwind CSS
- **Features**:
  - Modern responsive admin dashboard
  - Real-time API testing
  - Broadcast message form
  - Registration toggle controls

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Telegram Bot Token (optional)

### 1. Backend Setup

```bash
cd Backend/nest-backend
npm install
```

Create a `.env` file in the `Backend/nest-backend` directory:

```env
# Database
MONGODB_URI=your_mongodb_atlas_connection_string

# Server
PORT=3000
FRONTEND_URL=http://localhost:4200

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

### 3. Database Initialization

```bash
cd Backend/nest-backend
npm run init-db
```

This will:
- Test the MongoDB connection
- Initialize the database schema
- Display current registration status
- Show total registered users

### 4. Start the Application

**Backend:**
```bash
cd Backend/nest-backend
npm run start:dev
```

**Frontend:**
```bash
cd Frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api

## 📋 Available Scripts

### Backend Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run start:prod` - Start production server
- `npm run init-db` - Initialize and test database connection
- `npm run build` - Build the application
- `npm run lint` - Run ESLint

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build with watch mode

## 🔧 API Endpoints

### Broadcast Operations
- `POST /api/broadcast` - Send message to all registered users

### Registration Management
- `GET /api/registration/status` - Get current registration status
- `POST /api/registration/toggle` - Enable/disable user registration
- `POST /api/registration/register-user` - Register a new user (used by Telegram bot)

### User Management
- `GET /api/users` - Get all registered users

### Bot Operations
- `GET /api/bot/test` - Test bot connectivity

## 🤖 Telegram Bot Integration

The system includes a Telegram bot that:
- Automatically registers users when they send `/start`
- Stores user information (Telegram ID, username, first/last name)
- Enables broadcast messaging to all registered users

### Bot Setup
1. Create a bot via @BotFather on Telegram
2. Get your bot token
3. Add `TELEGRAM_BOT_TOKEN=your_token` to your `.env` file
4. Restart the backend server

## 🎯 Key Features

### 1. Broadcast Messaging
- Send messages to all registered users
- Real-time delivery status
- Message history tracking

### 2. Registration Management
- Toggle user registration on/off
- View current registration status
- Monitor user count

### 3. User Management
- View all registered users
- User details (Telegram ID, username, names)
- Registration timestamps

### 4. API Testing
- Built-in API testing interface
- Test all endpoints directly from the dashboard
- Real-time response display

## 🗄️ Database Schema

### Users Collection
```javascript
{
  telegramId: Number,
  username: String,
  firstName: String,
  lastName: String,
  registeredAt: Date
}
```

### Settings Collection
```javascript
{
  registrationEnabled: Boolean,
  lastUpdated: Date
}
```

## 🔒 Security Features

- CORS configuration for frontend-backend communication
- Input validation using class-validator
- Environment variable configuration
- MongoDB connection security

## 🛠️ Development

### Project Structure
```
RestartICT/
├── Backend/nest-backend/
│   ├── src/
│   │   ├── admin/           # Admin module (controllers, services)
│   │   ├── telegram/        # Telegram bot integration
│   │   ├── app.module.ts    # Main application module
│   │   └── main.ts          # Application entry point
│   └── package.json
└── Frontend/
    ├── src/app/
    │   ├── components/      # Angular components
    │   ├── services/        # API services
    │   └── app.component.ts # Main component
    └── package.json
```

### Adding New Features
1. Create new modules in the backend
2. Add corresponding Angular components
3. Update API endpoints
4. Test with the built-in API tester

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check your `MONGODB_URI` in `.env`
- Verify Atlas cluster is running
- Ensure IP is whitelisted in Atlas
- Check database user permissions

**Telegram Bot Not Working:**
- Verify `TELEGRAM_BOT_TOKEN` is set
- Check bot is not blocked by users
- Ensure bot has proper permissions

**Frontend Can't Connect to Backend:**
- Verify backend is running on port 3000
- Check CORS configuration
- Ensure `FRONTEND_URL` is set correctly

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes | - |
| `PORT` | Backend server port | No | 3000 |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:4200 |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | No | - |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**RICT Admin Platform** - Streamlining Telegram bot administration and user management.
