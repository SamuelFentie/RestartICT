import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { RegistrationSettings, RegistrationSettingsSchema } from './schemas/registration-settings.schema';
import { TelegramUser, TelegramUserSchema } from './schemas/telegram-user.schema';
import { TelegramModule } from '../telegram/telegram.module';
import {
  BroadcastController,
  RegistrationController,
  UsersController,
  BotController
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RegistrationSettings.name, schema: RegistrationSettingsSchema },
      { name: TelegramUser.name, schema: TelegramUserSchema }
    ]),
    forwardRef(() => TelegramModule)
  ],
  controllers: [
    BroadcastController,
    RegistrationController,
    UsersController,
    BotController
  ],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
