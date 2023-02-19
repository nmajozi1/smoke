export const mockDatabaseConnection = {
    getModelToken: jest.fn().mockReturnValue('mockModel'),
    close: jest.fn().mockResolvedValue(undefined),
    connection: {
        db: {
        collection: jest.fn(),
        },
    },
};

export const phoneNumberModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    find: jest.fn(),
    insertMany: jest.fn(),
};

export const serviceResult = [
    {
        country: 'ZA',
        type: 'MOBILE',
        possibleNumber: true,
        isValid: true,
        number: '+27614618298',
    }
];

export const validateResponse = [
    {
      country: 'ZA',
      possibleNumber: true,
      isValid: true,
      number: '+27614618298'
    }
];

export const result = {
    "message": `Based on the 1 you submitted. You have 1 valid which calculates to 100% valid results for the country.`,
    "numbers": [
        {
        "country": "ZA",
        "isValid": true,
        "number": "+27614618298",
        "possibleNumber": true,
        "type": "MOBILE"
        }
    ]
};