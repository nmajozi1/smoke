import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhoneNumberDocument = HydratedDocument<any>;

@Schema()
export class PhoneNumber {
  @Prop()
  country: string;

  @Prop()
  type: string;

  @Prop()
  possibleNumber: boolean;

  @Prop()
  isValid: Boolean;

  @Prop()
  number: string;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);