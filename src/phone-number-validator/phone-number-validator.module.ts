import { Module } from '@nestjs/common';
import { PhoneNumberValidatorService } from './services/phone-number-validator/phone-number-validator.service';
import { ValidateController } from './controllers/validate/validate.controller';
import { Validate } from './classes/validate/validate';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneNumber, PhoneNumberSchema } from './db/schemas/phone-number.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])],
  controllers: [ValidateController],
  providers: [PhoneNumberValidatorService, Validate]
})
export class PhoneNumberValidatorModule {}
