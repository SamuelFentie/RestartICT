import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from '../admin/admin.service';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: any;
  private readonly logger = new Logger(TelegramBotService.name);

  constructor(
    private configService: ConfigService,
    private adminService: AdminService,
  ) {}

  async onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_TOKEN');
    
    if (!token) {
      console.log('❌ TELEGRAM_TOKEN not configured. Bot will not start.');
      this.logger.error('TELEGRAM_TOKEN not configured. Bot will not start.');
      return;
    }

    try {
      // Create a bot that uses polling to fetch new updates
      this.bot = new TelegramBot(token, { polling: true });
      this.setupBotHandlers();
      console.log('🤖 Bot is running and listening for commands...');
      console.log('📡 Polling enabled - waiting for messages');
      console.log('✅ Ready to receive /start, /help, /status commands');
      this.logger.log('Telegram bot started successfully with polling enabled');
    } catch (error) {
      console.log('❌ Failed to start Telegram bot:', error);
      this.logger.error('Failed to start Telegram bot:', error);
    }
  }

  private setupBotHandlers() {
    // Listen for any message
    this.bot.on('message', async (msg: any) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      const user = msg.from;

      console.log('📨 New message received:');
      console.log('   - Chat ID:', chatId);
      console.log('   - Text:', text);
      console.log('   - From:', user?.username || user?.first_name || 'Unknown');
      console.log('---');

      // Handle /start command
      if (text === '/start') {
        console.log('🚀 /start command received!');
        console.log('📱 Chat ID:', chatId);
        console.log('👤 User:', user);
        
        if (!user) {
          console.log('❌ No user information available');
          this.bot.sendMessage(chatId, 'Unable to get user information.');
          return;
        }

        console.log('✅ User details:');
        console.log('   - ID:', user.id);
        console.log('   - Username:', user.username || 'No username');
        console.log('   - First Name:', user.first_name || 'No first name');
        console.log('   - Last Name:', user.last_name || 'No last name');

        // Handle user registration
        try {
          const registrationResult = await this.adminService.registerUser(
            user.id,
            user.username || '',
            user.first_name || '',
            user.last_name || ''
          );

          if (registrationResult.success) {
            const welcomeMessage = `
🎉 *Welcome to RICT Bot!*

✅ You have been successfully registered.

You can now receive important updates and announcements from our administrators.

Use /help to see available commands.
            `;
            this.bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
            console.log('📤 Registration successful - welcome message sent');
          } else {
            let message = '';
            if (registrationResult.message === 'User is already registered') {
              message = `
👋 *Welcome back!*

You are already registered with RICT Bot.

Use /help to see available commands.
              `;
              console.log('📤 User already registered - welcome back message sent');
            } else if (registrationResult.message === 'Registration is currently disabled') {
              message = `
🚫 *Registration Disabled*

Sorry, new user registration is currently disabled.

Please contact an administrator if you need access.
              `;
              console.log('📤 Registration disabled - notification sent');
            } else {
              message = `❌ ${registrationResult.message}`;
              console.log('📤 Registration error - error message sent');
            }
            
            this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
          }
        } catch (error) {
          console.log('❌ Registration error:', error);
          this.bot.sendMessage(chatId, '❌ An error occurred during registration. Please try again later.');
        }
      }
      // Handle /help command
      else if (text === '/help') {
        const helpMessage = `
🤖 *RICT Bot Commands*

/start - Start the bot and get welcome message
/help - Show this help message
/status - Check bot status

*Note:* This bot is managed by administrators.
        `;
        this.bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
      }
      // Handle /status command
      else if (text === '/status') {
        this.bot.sendMessage(chatId, 'Bot is running and ready to receive commands.');
      }
      // Handle any other message
      else {
        // Send a simple reply for any message
        this.bot.sendMessage(chatId, `You said: ${text}`);
      }
    });

    // Handle errors
    this.bot.on('error', (error: any) => {
      console.log('❌ Telegram bot error:', error);
      this.logger.error('Telegram bot error:', error);
    });

    // Handle polling errors
    this.bot.on('polling_error', (error: any) => {
      console.log('❌ Telegram bot polling error:', error);
      this.logger.error('Telegram bot polling error:', error);
    });
  }

  // Method to send message to a specific user (for testing)
  async sendMessageToUser(chatId: number, message: string): Promise<void> {
    try {
      this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      console.log(`📤 Message sent to user ${chatId}`);
      this.logger.log(`Message sent to user ${chatId}`);
    } catch (error) {
      console.log(`❌ Failed to send message to user ${chatId}:`, error);
      this.logger.error(`Failed to send message to user ${chatId}:`, error);
      throw error;
    }
  }

  // Method to send photo to a specific user (for testing)
  async sendPhotoToUser(chatId: number, photoUrl: string, caption?: string): Promise<void> {
    try {
      this.bot.sendPhoto(chatId, photoUrl, { 
        caption,
        parse_mode: 'Markdown'
      });
      console.log(`📷 Photo sent to user ${chatId}`);
      this.logger.log(`Photo sent to user ${chatId}`);
    } catch (error) {
      console.log(`❌ Failed to send photo to user ${chatId}:`, error);
      this.logger.error(`Failed to send photo to user ${chatId}:`, error);
      throw error;
    }
  }

  // Method to check if bot is listening
  isBotListening(): boolean {
    return this.bot && this.bot.isPolling();
  }

  // Method to get bot status
  getBotStatus(): { isListening: boolean; isPolling: boolean; hasToken: boolean } {
    const token = this.configService.get<string>('TELEGRAM_TOKEN');
    return {
      isListening: !!this.bot,
      isPolling: this.bot ? this.bot.isPolling() : false,
      hasToken: !!token
    };
  }
}
