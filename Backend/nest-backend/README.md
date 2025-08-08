# RICT Admin Panel Backend

A NestJS backend for the RICT Telegram Bot Admin Panel with full Telegram bot integration.

## Features

- **Telegram Bot Integration**: Real bot with /start, /help, /status commands
- **Broadcast Messaging**: Send messages to all registered Telegram users
- **Registration Control**: Toggle user registration on/off
- **User Management**: Register and manage Telegram users
- **MongoDB Integration**: Persistent data storage
- **RESTful API**: Clean API endpoints for frontend integration

## Quick Start

### 1. Create Telegram Bot
1. Message @BotFather on Telegram
2. Send `/newbot`
3. Choose a name for your bot
4. Choose a username (must end with 'bot')
5. Copy the bot token

### 2. Setup Environment
Create a `.env` file:
```env
# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:4200

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
```

### 3. Install & Run
```bash
npm install
npm run init-db
npm run start:dev
```

### 4. Test the Bot
1. Find your bot on Telegram (using the username you created)
2. Send `/start` to register
3. Check the backend logs for registration confirmation
4. Use the admin panel to send broadcast messages

## API Endpoints

### Broadcast Messages
- `POST /api/broadcast` - Send message to all registered users
  ```json
  {
    "imageUrl": "https://example.com/image.jpg", // optional
    "title": "Message Title",
    "body": "Message content"
  }
  ```

### Registration Control
- `GET /api/registration-status` - Get current registration status
- `POST /api/toggle-registration` - Toggle registration on/off

### User Management
- `POST /api/register-user` - Register a new Telegram user
- `GET /api/users` - Get all registered users

### Testing
- `GET /api/test-bot` - Check if bot is running

## Telegram Bot Commands

### `/start`
- Registers the user in the database
- Sends welcome message
- User will receive broadcast messages

### `/help`
- Shows available commands
- Provides bot information

### `/status`
- Checks if user is registered
- Shows registration status

## Testing Your Setup

### 1. Verify Bot is Running
```bash
curl http://localhost:3000/api/test-bot
```

### 2. Test User Registration
1. Send `/start` to your bot in Telegram
2. Check backend logs for:
   ```
   User username (123456789) started the bot
   User username registered successfully
   ```

### 3. Test Broadcast Message
1. Use the admin panel to send a message
2. Check that registered users receive the message
3. Verify in backend logs:
   ```
   Broadcast completed: 1/1 messages sent successfully
   ```

### 4. Check Database
```bash
# Connect to MongoDB and check collections
use rict-admin
db.telegramusers.find()  # Should show registered users
db.registrationsettings.find()  # Should show registration status
```

## Database Schema

### RegistrationSettings
- `enabled`: boolean - Whether registration is enabled
- `lastUpdated`: Date - Last time registration status was changed

### TelegramUser
- `telegramId`: number - Unique Telegram user ID
- `username`: string - Telegram username
- `firstName`: string - User's first name (optional)
- `lastName`: string - User's last name (optional)
- `isActive`: boolean - Whether user is active
- `registeredAt`: Date - Registration timestamp

## Development

### Project Structure
```
src/
├── admin/
│   ├── dto/                    # Data Transfer Objects
│   ├── schemas/                # MongoDB schemas
│   ├── admin.controller.ts     # API endpoints
│   ├── admin.service.ts        # Business logic
│   └── admin.module.ts         # Module configuration
├── telegram/
│   ├── telegram-bot.service.ts # Telegram bot logic
│   └── telegram.module.ts      # Bot module
├── app.module.ts               # Main application module
└── main.ts                     # Application entry point
```

### Adding New Bot Commands

1. Add command handler in `telegram-bot.service.ts`:
   ```typescript
   this.bot.onText(/\/yourcommand/, async (msg) => {
     // Handle command
   });
   ```

2. Update help message with new command

### Adding New Features

1. Create DTOs in `admin/dto/`
2. Create schemas in `admin/schemas/`
3. Add service methods in `admin.service.ts`
4. Add controller endpoints in `admin.controller.ts`

## Troubleshooting

### Bot Not Starting
- Check `TELEGRAM_BOT_TOKEN` in .env
- Verify token is correct from @BotFather
- Check logs for error messages

### Users Not Receiving Messages
- Ensure users have sent `/start` to register
- Check registration is enabled
- Verify MongoDB connection
- Check Telegram API rate limits

### Database Issues
- Verify MongoDB URI in .env
- Run `npm run init-db` to initialize
- Check MongoDB logs for connection errors

## Production Deployment

1. Set environment variables for production
2. Use PM2 or similar process manager
3. Set up MongoDB with proper authentication
4. Configure webhook instead of polling (optional)
5. Set up SSL certificates for webhook

## License

This project is part of the RICT platform.
