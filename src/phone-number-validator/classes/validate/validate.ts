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
            if(phoneNumberList.length < 1) throw new BadRequestException('Phone numbers are missing', { cause: new Error(), description: 'Phone Numbers have not been provided.'});
            const phoneNumberInfo = await this.getPhoneNumberInfo(phoneNumberList);
            if(phoneNumberInfo.length < 1) throw new BadRequestException('Country information is missing', { cause: new Error(), description: 'Could not find information on the selected country.'});
            const nums = await this.validationService.validateNumbers(phoneNumberInfo);
            const respMessage = await this.getResponseMessage(nums);
            return {numbers: nums, message: respMessage};
        } catch (e) {
            console.error(e);
            return { error: e };
        }
    }

    private async getPhoneNumberInfo(phoneNumberList: [string]) {
        try {
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
        } catch (error) {
            throw new BadRequestException('Phone numbers are missing', { cause: new Error(), description: 'Phone Numbers for the selected country could not be validated.' })
        }
    }

    private async getResponseMessage(numbers: any) {
        const valid = numbers.filter((num: { isValid: boolean; }) => num.isValid === true);
        const percentage = (valid.length / numbers.length) * 100;
        const message = `Based on the ${numbers.length} you submitted. You have ${valid.length} valid which calculates to ${percentage}% valid results for the country.`

        return message;
    }
}
