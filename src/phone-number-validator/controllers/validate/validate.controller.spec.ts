import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumber } from 'libphonenumber-js';
import { PhoneNumberSchema } from '../../db/schemas/phone-number.schema'
import { Validate } from '../../classes/validate/validate';
import { PhoneNumberValidatorDto } from '../../dtos/phone-number-validator.dto';
import { PhoneNumberValidatorService } from '../../services/phone-number-validator/phone-number-validator.service';
import { ValidateController } from './validate.controller';

describe('ValidateController', () => {
  let controller: ValidateController;
  let phoneNumberValidatorService: PhoneNumberValidatorService;
  let validate: Validate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: PhoneNumber.name, schema: PhoneNumberSchema }])],
      controllers: [ValidateController],
      providers: [Validate, PhoneNumberValidatorService]
    }).compile();

    controller = module.get<ValidateController>(ValidateController);
  });

  describe('validateNumbers', () => {
    it('Should return an object containg a list of phone numbers and a message', async () => {

      const result = [{
        country: 'ZA',
        type: 'MOBILE',
        possibleNumber: true,
        isValid: true,
        number: '+27614618298'
      }];

      const validateResponse = {
        numbers: [''],
        message: ''
      }

      const phoneNumbers: PhoneNumberValidatorDto = {phoneNumberList: ['+27614618298']}

      jest.spyOn(await validate, 'validate').mockImplementation(() => Promise.resolve(validateResponse));
      jest.spyOn(phoneNumberValidatorService, 'validateNumbers').mockImplementation(() => Promise.resolve(result));

      expect(await controller.validateNumbers(phoneNumbers)).toBe(result);
    });
  })
});
