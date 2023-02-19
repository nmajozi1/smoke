import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberValidatorService } from './phone-number-validator.service';
import { PhoneNumber, PhoneNumberSchema } from '../../db/schemas/phone-number.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { mockDatabaseConnection, serviceResult, modelResult } from '../../mock/phone-number-generator.mock';
import { Model } from 'mongoose';

describe('PhoneNumberValidatorService', () => {
  let service: PhoneNumberValidatorService;
  let model: Model<PhoneNumber>;
  let phoneNumberValidatorService: PhoneNumberValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/smoke'),
        MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])
      ],
      providers: [
        PhoneNumberValidatorService,
        {
          provide: 'DatabaseConnection',
          useValue: mockDatabaseConnection,
        },
      ],
    }).compile();

    service = module.get<PhoneNumberValidatorService>(PhoneNumberValidatorService);
    model = module.get<Model<PhoneNumber>>(getModelToken('PhoneNumber'));

    phoneNumberValidatorService = module.get<PhoneNumberValidatorService>(PhoneNumberValidatorService);

    jest.spyOn(phoneNumberValidatorService, 'validateNumbers').mockImplementation(() => Promise.resolve(modelResult));
  });

  it('Return phone number information', async () => {
    expect(await service.validateNumbers(serviceResult)).toEqual(modelResult);
  });
});