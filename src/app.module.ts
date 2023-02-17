import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneNumberValidatorModule } from './phone-number-validator/phone-number-validator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PhoneNumberValidatorModule,
    MongooseModule.forRoot('mongodb://localhost/smoke')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
