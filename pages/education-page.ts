import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { UserData } from '../testdata';
import { Helpers } from '../utils/helpers';

export class EducationPage extends BasePage {
    readonly schoolNameInput: Locator;
    readonly schoolStreetInput: Locator;
    readonly schoolAdditionalStreetInput: Locator;
    readonly schoolCityInput: Locator;
    readonly schoolStateInput: Locator;
    readonly schoolZipCodeInput: Locator;
    readonly graduationYearInput: Locator;
    readonly gpaInput: Locator;
    readonly uploadButton: Locator;
    readonly fileInput: Locator;
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.schoolNameInput = page.getByRole('textbox', { name: 'High School Name' });
        this.schoolStreetInput = page.getByRole('textbox', { name: 'High School Street Address', exact: true });
        this.schoolAdditionalStreetInput = page.getByRole('textbox', { name: 'Additional High School Street' });
        this.schoolCityInput = page.getByRole('textbox', { name: 'High School City' });
        this.schoolStateInput = page.getByRole('textbox', { name: 'High School State (Full)' });
        this.schoolZipCodeInput = page.getByRole('textbox', { name: 'High School Zip Code' });
        this.graduationYearInput = page.getByRole('textbox', { name: 'Year of High School Graduation' });
        this.gpaInput = page.getByRole('textbox', { name: 'GPA' });
        this.uploadButton = page.getByRole('button', { name: 'Upload File' });
        this.fileInput = page.locator('input[type="file"]');
        this.nextPageButton = page.getByRole('button', { name: 'Next Page' });
    }

    async navigate() {

    }

    async isPageLoaded() {
        return this.schoolNameInput.isVisible();
    }

    async fillEducationInfo(education: UserData['education']) {
        await this.schoolNameInput.fill(education.schoolName);
        await this.schoolStreetInput.fill(education.schoolStreet);
        await this.schoolAdditionalStreetInput.fill(education.schoolAdditionalStreet || '');
        await this.schoolCityInput.fill(education.schoolCity);
        await this.schoolStateInput.click();
        await this.page.getByRole('option', { name: education.schoolState }).click();
        await this.schoolZipCodeInput.fill(education.schoolZipCode);
        await this.gpaInput.fill(education.gpa);
        await this.graduationYearInput.fill(education.graduationYear);
    }

    async uploadTranscript(filePath: string) {
        await this.uploadButton.scrollIntoViewIfNeeded();
        await this.fileInput.setInputFiles(filePath);
        await this.page.getByText('MySchoolTranscript.pdf').waitFor();
        await this.page.waitForTimeout(6000);
    }

    async goToNextPage() {
        this.page.waitForTimeout(3000)
        await this.nextPageButton.click();
        this.page.waitForTimeout(3000)

    }
}