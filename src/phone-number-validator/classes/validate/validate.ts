import { BadRequestException, Injectable } from "@nestjs/common";
import { isPossibleNumber, isValidPhoneNumber } from "libphonenumber-js";
import { parsePhoneNumber } from "libphonenumber-js/max";
import { PhoneNumbers } from "../../interfaces/phone-number.interface";
import { PhoneNumberValidatorService } from "../../services/phone-number-validator/phone-number-validator.service";

@Injectable()
export class Validate {
    constructor(private validationService: PhoneNumberValidatorService) {}

    async validate(phoneNumbers: PhoneNumbers) {
        try {
            const { phoneNumberList } = phoneNumbers;
            if(phoneNumberList.length < 1) throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Phone Numbers have not been provided.' })
            const phoneNumberInfo = await this.getPhoneNumberInfo(phoneNumberList);
            const nums = await this.validationService.validateNumbers(phoneNumberInfo);
            const respMessage = await this.getResponseMessage(nums);
            return {numbers: nums, message: respMessage};
        } catch (e) {
            console.error('ERROR_: ', e);
            return { error: e };
        }
    }

    private async getPhoneNumberInfo(phoneNumberList: [string]) {

        const phoneNumberInfo = phoneNumberList.map(num => {
            const phoneNumber = parsePhoneNumber(num);
            const info = {
                number: phoneNumber.number,
                country: phoneNumber.country,
                type: phoneNumber.getType(),
                possibleNumber: isPossibleNumber(num, phoneNumber.country),
                isValid: isValidPhoneNumber(num, phoneNumber.country)
            }

            return info;
        });

        return phoneNumberInfo
    }

    private async getResponseMessage(numbers: any) {
        const valid = numbers.filter(num => num.isValid === true);
        const percentage = (valid.length / numbers.length) * 100;
        const message = `Based on the ${numbers.length} you submitted. You have ${valid.length}
        valid which calculates to ${percentage}% valid results for the country.`

        return message;
    }
}
