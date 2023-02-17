import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneNumber, PhoneNumberDocument } from '../../db/schemas/phone-number.schema';
import { PhoneNumberInfo } from '../../interfaces/phone-number.interface';

@Injectable()
export class PhoneNumberValidatorService {
    constructor(@InjectModel(PhoneNumber.name) private phoneNumberModel: Model<PhoneNumberDocument>) {}

    async validateNumbers(phoneNumbers: PhoneNumberInfo[]): Promise<any> {
        try {
            return await this.phoneNumberModel.insertMany(phoneNumbers);
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Failed insert phone numbers',
            }, HttpStatus.FORBIDDEN, {
                cause: e
             });
        }
    }
}
