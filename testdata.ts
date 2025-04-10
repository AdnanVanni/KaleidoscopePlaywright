export interface UserData {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    address: {
        street: string;
        additionalStreet?: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    education: {
        schoolName: string;
        schoolStreet: string;
        schoolAdditionalStreet?: string;
        schoolCity: string;
        schoolState: string;
        schoolZipCode: string;
        graduationYear: string;
        gpa: string;
    };
    extracurriculars: Array<{
        name: string;
        years: string;
        leadership: string;
        description: string;
    }>;
    essays: {
        animals: string;
        school: string;
    };
}

export const testUser: UserData = {
    firstName: 'Test',
    lastName: 'User',
    phone: '+1 (910) 322-6697',
    password: 'GGRuam@32123',
    address: {
        street: 'street 1',
        additionalStreet: 'street 1 new building',
        city: 'New York',
        state: 'California',
        zipCode: '100001',
        country: 'United States of America'
    },
    education: {
        schoolName: 'Heaevns school',
        schoolStreet: 'hynda',
        schoolAdditionalStreet: 'ghuman',
        schoolCity: 'city',
        schoolState: 'New York',
        schoolZipCode: '10001',
        graduationYear: '2024',
        gpa: '4'
    },
    extracurriculars: [
        {
            name: 'test1',
            years: '1',
            leadership: '1',
            description: '1'
        },
        {
            name: 'test2',
            years: '2',
            leadership: '2',
            description: '2'
        },
        {
            name: 'test3',
            years: '3',
            leadership: '3',
            description: '3'
        },
        {
            name: 'test4',
            years: '4',
            leadership: '4',
            description: '4'
        }
    ],
    essays: {
        animals: 'animal essay',
        school: 'school essay'
    }
};