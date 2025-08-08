import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TelegramUserDocument = TelegramUser & Document;

@Schema({ timestamps: true })
export class TelegramUser {
  @Prop({ required: true, unique: true })
  telegramId: number;

  @Prop({ required: true })
  username: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true, default: Date.now })
  registeredAt: Date;
}

export const TelegramUserSchema = SchemaFactory.createForClass(TelegramUser);
