import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { UserData } from '../testdata';
import { expect } from '@playwright/test';

export class EssayPage extends BasePage {
    readonly animalsCheckbox: Locator;
    readonly schoolCheckbox: Locator;
    readonly animalsEssayInput: Locator;
    readonly schoolEssayInput: Locator;
    readonly nextPageButton: Locator;
    readonly editButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.animalsCheckbox = page.getByRole('checkbox', { name: 'Animals' });
        this.schoolCheckbox = page.getByRole('checkbox', { name: 'School' });
        this.animalsEssayInput = page.getByRole('textbox', { name: 'Essay about Animals' });
        this.schoolEssayInput = page.getByRole('textbox', { name: 'Essay about School' });
        this.nextPageButton = page.getByRole('button', { name: 'Next Page' });
        this.editButton = page.locator('button', { hasText: 'Edit' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }



    async isPageLoaded() {
        return this.animalsCheckbox.isVisible();
    }

    async fillEssays(essays: UserData['essays']): Promise<void> {
        await this.animalsCheckbox.check();
        await this.schoolCheckbox.check();
        await this.animalsEssayInput.fill(essays.animals);
        await this.schoolEssayInput.fill(essays.school);
        await this.page.waitForTimeout(2000)
        await this.nextPageButton.click();
    }

    async verifyEssays(): Promise<void> {
        await this.page.getByText('animal essay').scrollIntoViewIfNeeded();
        await this.page.getByText('school essay').scrollIntoViewIfNeeded();
    }

    async submitApplication() {
        await this.submitButton.click();

    }

    async verifySubmissionSuccess() {
        this.page.getByText('success')
        // const currentUrl = await this.page.url();
        // console.log('Current URL:', currentUrl);
        // this.page.goto(currentUrl)


    }
}





