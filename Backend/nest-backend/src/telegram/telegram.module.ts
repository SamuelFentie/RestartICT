import { Module, forwardRef } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [forwardRef(() => AdminModule)],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramModule {}
