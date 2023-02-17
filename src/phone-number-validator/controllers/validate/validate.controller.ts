import { Body, Controller, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Validate } from '../../classes/validate/validate';
import { PhoneNumberValidatorDto } from '../../dtos/phone-number-validator.dto';

@Controller('validate')
export class ValidateController {
    constructor(@InjectConnection() private connection: Connection, private validateClass: Validate) {}

    @Post()
    validateNumbers(@Body() phoneNumbers: PhoneNumberValidatorDto) {

        console.log(`MongoDB connected: ${this.connection.readyState === 1}`);
        
        return this.validateClass.validate(phoneNumbers);
    }
}
