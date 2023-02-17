export interface PhoneNumbers {
    phoneNumberList: [string]
}

export interface PhoneNumberInfo {
    country: string,
    type: string,
    number: string,
    possibleNumber: boolean,
    isValid: boolean
}
