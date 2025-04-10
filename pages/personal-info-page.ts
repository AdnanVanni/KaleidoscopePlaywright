import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { UserData } from '../testdata';

export class PersonalInfoPage extends BasePage {
    readonly streetAddressInput: Locator;
    readonly additionalStreetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly countryInput: Locator;
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.streetAddressInput = page.getByRole('textbox', { name: 'Street Address', exact: true });
        this.additionalStreetInput = page.getByRole('textbox', { name: 'Additional Street Address' });
        this.cityInput = page.getByRole('textbox', { name: 'City' });
        this.stateInput = page.getByRole('textbox', { name: 'State (Full)' });
        this.zipCodeInput = page.getByRole('textbox', { name: 'Zip Code' });
        this.countryInput = page.getByRole('textbox', { name: 'Country' });
        this.nextPageButton = page.getByRole('button', { name: 'Next Page' });
    }

    async navigate(): Promise<void> {
        // This page is accessed after login/registration
    }

    async isPageLoaded(): Promise<boolean> {
        return this.streetAddressInput.isVisible();
    }

    async fillPersonalInfo(address: UserData['address']) {
        await this.streetAddressInput.fill(address.street);
        await this.additionalStreetInput.fill(address.additionalStreet || '');
        await this.cityInput.fill(address.city);
        await this.stateInput.click();
        await this.page.getByRole('option', { name: address.state }).click();
        await this.zipCodeInput.fill(address.zipCode);
        await this.countryInput.click();
        await this.page.getByRole('option', { name: address.country }).click();
        await this.page.waitForTimeout(3000)
        await this.nextPageButton.click();
        this.page.waitForTimeout(3000)
    }
}