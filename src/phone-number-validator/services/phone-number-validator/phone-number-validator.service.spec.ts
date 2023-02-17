import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberValidatorService } from './phone-number-validator.service';
import { PhoneNumber, PhoneNumberDocument, PhoneNumberSchema } from '../../db/schemas/phone-number.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

describe('PhoneNumberValidatorService', () => {
  let service: PhoneNumberValidatorService;
  let connection: Connection

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])
      ],
      providers: [PhoneNumberValidatorService],
    }).compile();

    service = module.get<PhoneNumberValidatorService>(PhoneNumberValidatorService);
  });

  it('Return phone number information', async () => {

    const phoneNumbers = [{
      country: 'ZA',
      type: 'MOBILE',
      possibleNumber: true,
      isValid: true,
      number: '+27614618298'
    }];

    expect(await service.validateNumbers(phoneNumbers)).toBe(phoneNumbers);
  });
});
