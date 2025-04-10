import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { Helpers } from '../utils/helpers';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly nextButton: Locator;
    readonly createAccountHeading: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly ageCheckbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.createAccountHeading = page.getByRole('heading', { name: 'Let\'s create your account.' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.phoneInput = page.getByRole('textbox', { name: '1 (702) 123-' });
        this.passwordInput = page.getByRole('textbox', { name: 'Create a Password' });
        this.ageCheckbox = page.getByRole('checkbox', { name: 'I confirm that I am at least' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');
        await this.page.getByRole('button', { name: 'Log In to Apply' }).click();
    }

    async isPageLoaded(): Promise<boolean> {
        return this.emailInput.isVisible();
    }

    async Register(email: string, password: string, userData: { firstName: string; lastName: string; phone: string }): Promise<void> {
        await this.emailInput.fill(email);
        await this.nextButton.click();


        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.phoneInput.fill(userData.phone);
        await this.passwordInput.fill(password);
        await this.ageCheckbox.check();
        await this.submitButton.click();

    }
}