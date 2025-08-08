import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { RegistrationSettings, RegistrationSettingsDocument } from './schemas/registration-settings.schema';
import { TelegramUser, TelegramUserDocument } from './schemas/telegram-user.schema';
import { BroadcastMessageDto } from './dto/broadcast-message.dto';
import { RegistrationStatusDto, ToggleRegistrationResponseDto } from './dto/registration-status.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(RegistrationSettings.name) private registrationSettingsModel: Model<RegistrationSettingsDocument>,
    @InjectModel(TelegramUser.name) private telegramUserModel: Model<TelegramUserDocument>,
    private configService: ConfigService,
  ) {}

  async broadcastMessage(broadcastMessageDto: BroadcastMessageDto): Promise<{ message: string; sentTo: number }> {
    try {
      // Get all active Telegram users
      const users = await this.telegramUserModel.find({ isActive: true });
      
      if (users.length === 0) {
        throw new BadRequestException('No active users found to broadcast to');
      }

      let successCount = 0;
      const errors: string[] = [];

      // Send message to each user
      for (const user of users) {
        try {
          await this.sendTelegramMessage(user.telegramId, broadcastMessageDto);
          successCount++;
        } catch (error) {
          console.error(`Failed to send message to user ${user.telegramId}:`, error.message);
          errors.push(`User ${user.username}: ${error.message}`);
        }
      }

      console.log(`Broadcast completed: ${successCount}/${users.length} messages sent successfully`);
      if (errors.length > 0) {
        console.log('Errors:', errors);
      }

      return {
        message: `Message broadcasted successfully to ${successCount} out of ${users.length} users`,
        sentTo: successCount
      };
    } catch (error) {
      throw new BadRequestException(`Failed to broadcast message: ${error.message}`);
    }
  }

  private async sendTelegramMessage(chatId: number, messageData: BroadcastMessageDto): Promise<void> {
    try {
      const messageText = `*${messageData.title}*\n\n${messageData.body}`;
      
      // For now, we'll use axios as before, but you can inject TelegramBotService here
      // and use it instead for better integration
      const axios = require('axios');
      const telegramBotToken = this.configService.get<string>('TELEGRAM_TOKEN');
      
      if (!telegramBotToken) {
        throw new Error('Telegram bot token not configured');
      }

      const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}`;

      // Add image if provided
      if (messageData.imageUrl) {
        const payload = {
          chat_id: chatId,
          photo: messageData.imageUrl,
          caption: messageText,
          parse_mode: 'Markdown'
        };
        
        // Send photo with caption
        await axios.post(`${telegramApiUrl}/sendPhoto`, payload);
      } else {
        // Send text message only
        const payload = {
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown'
        };
        
        await axios.post(`${telegramApiUrl}/sendMessage`, payload);
      }
    } catch (error) {
      if (error.response?.data) {
        throw new Error(`Telegram API error: ${error.response.data.description}`);
      }
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async getRegistrationStatus(): Promise<RegistrationStatusDto> {
    try {
      // Get or create registration settings
      let settings = await this.registrationSettingsModel.findOne();
      
      if (!settings) {
        // Create default settings if none exist
        settings = await this.registrationSettingsModel.create({
          registrationEnabled: false,
          lastUpdated: new Date()
        });
      }

      return {
        enabled: settings.registrationEnabled,
        lastUpdated: settings.lastUpdated
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get registration status: ${error.message}`);
    }
  }

  async toggleRegistration(): Promise<ToggleRegistrationResponseDto> {
    try {
      // Get or create registration settings
      let settings = await this.registrationSettingsModel.findOne();
      
      if (!settings) {
        settings = await this.registrationSettingsModel.create({
          registrationEnabled: true,
          lastUpdated: new Date()
        });
      } else {
        settings.registrationEnabled = !settings.registrationEnabled;
        settings.lastUpdated = new Date();
        await settings.save();
      }

      return {
        enabled: settings.registrationEnabled,
        message: `Registration ${settings.registrationEnabled ? 'enabled' : 'disabled'} successfully`
      };
    } catch (error) {
      throw new BadRequestException(`Failed to toggle registration: ${error.message}`);
    }
  }

  async registerUser(telegramId: number, username: string, firstName?: string, lastName?: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if registration is enabled
      const settings = await this.getRegistrationStatus();
      
      if (!settings.enabled) {
        return {
          success: false,
          message: 'Registration is currently disabled'
        };
      }

      // Check if user already exists
      const existingUser = await this.telegramUserModel.findOne({ telegramId });
      
      if (existingUser) {
        return {
          success: false,
          message: 'User is already registered'
        };
      }

      // Register new user
      await this.telegramUserModel.create({
        telegramId,
        username,
        firstName,
        lastName,
        isActive: true,
        registeredAt: new Date()
      });

      return {
        success: true,
        message: 'User registered successfully'
      };
    } catch (error) {
      throw new BadRequestException(`Failed to register user: ${error.message}`);
    }
  }

  async getRegisteredUsers(): Promise<{ users: any[]; total: number }> {
    try {
      const users = await this.telegramUserModel.find({ isActive: true }).select('-__v');
      return {
        users,
        total: users.length
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get users: ${error.message}`);
    }
  }
}
