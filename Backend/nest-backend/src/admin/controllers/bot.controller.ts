import { Controller, Get } from '@nestjs/common';
import { TelegramBotService } from '../../telegram/telegram-bot.service';

@Controller('bot')
export class BotController {
  constructor(private telegramBotService: TelegramBotService) {}

  @Get('test')
  async testBot() {
    return {
      message: 'Bot is running! Check the logs for bot startup messages.',
      instructions: [
        '1. Make sure your .env file has TELEGRAM_BOT_TOKEN',
        '2. Send /start to your bot in Telegram',
        '3. Check the logs for registration messages',
        '4. Use the admin panel to send broadcast messages'
      ]
    };
  }

  @Get('status')
  async getBotStatus() {
    const status = this.telegramBotService.getBotStatus();
    return {
      ...status,
      message: status.isListening 
        ? 'Bot is listening for /start and other commands' 
        : 'Bot is not listening - check configuration and logs',
      timestamp: new Date().toISOString()
    };
  }
}
