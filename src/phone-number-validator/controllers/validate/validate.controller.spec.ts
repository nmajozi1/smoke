import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumber, PhoneNumberSchema } from '../../db/schemas/phone-number.schema'
import { Validate } from '../../classes/validate/validate';
import { PhoneNumberValidatorDto } from '../../dtos/phone-number-validator.dto';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator/phone-number-validator.service';
import { ValidateController } from './validate.controller';
import { mockDatabaseConnection, phoneNumberModel, serviceResult, result } from '../../mock/phone-number-generator.mock';

describe('ValidateController', () => {
  let controller: ValidateController;
  let phoneNumberValidatorService: PhoneNumberValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/mydb'),
        MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])
      ],
      controllers: [ValidateController],
      providers: [
        Validate,
        PhoneNumberValidatorService,
        {
          provide: 'DatabaseConnection',
          useValue: mockDatabaseConnection,
        },
        {
          provide: getModelToken(PhoneNumber.name),
          useValue: phoneNumberModel,
        }
      ]
    }).compile();

    controller = module.get<ValidateController>(ValidateController);
    phoneNumberValidatorService = module.get<PhoneNumberValidatorService>(PhoneNumberValidatorService);
  });

  describe('validateNumbers', () => {
    it('Should return an object containg a list of phone numbers and a message', async () => {

      const phoneNumbers: PhoneNumberValidatorDto = {phoneNumberList: ['+27614618298']};

      jest.spyOn(phoneNumberValidatorService, 'validateNumbers').mockImplementation(() => Promise.resolve(serviceResult));

      expect(await controller.validateNumbers(phoneNumbers)).toStrictEqual(result);
    });
  })
});

