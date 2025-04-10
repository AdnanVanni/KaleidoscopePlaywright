export class Helpers {
    static generateRandomEmail(): string {
        return `${Math.random().toString(36).substring(2, 10)}@${['example.com', 'testmail.org', 'fakedomain.net'][Math.floor(Math.random() * 3)]
            }`;
    }


}