import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberValidatorService } from './phone-number-validator.service';
import { PhoneNumber, PhoneNumberSchema } from '../../db/schemas/phone-number.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { mockDatabaseConnection, phoneNumberModel, serviceResult, validateResponse } from '../../mock/phone-number-generator.mock';

describe('PhoneNumberValidatorService', () => {
  let service: PhoneNumberValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/mydb'),
        MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])
      ],
      providers: [
        PhoneNumberValidatorService,
        {
          provide: 'DatabaseConnection',
          useValue: mockDatabaseConnection,
        },
        {
          provide: getModelToken(PhoneNumber.name),
          useValue: phoneNumberModel,
        }
      ],
    }).compile();

    service = module.get<PhoneNumberValidatorService>(PhoneNumberValidatorService);
  });

  it('Return phone number information', async () => {
    expect(await service.validateNumbers(serviceResult)).toBe(validateResponse);
  });
});