import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationSettingsDocument = RegistrationSettings & Document;

@Schema({ timestamps: true })
export class RegistrationSettings {
  @Prop({ required: true, default: true })
  registrationEnabled: boolean;

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date;
}

export const RegistrationSettingsSchema = SchemaFactory.createForClass(RegistrationSettings);
