import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { UserData } from '../testdata';
import { Helpers } from '../utils/helpers';

export class ExtracurricularPage extends BasePage {
    readonly addEntryButton: Locator;
    readonly activityNameInput: Locator;
    readonly yearsInvolvedInput: Locator;
    readonly leadershipRolesInput: Locator;
    readonly descriptionInput: Locator;
    readonly addButton: Locator;
    readonly nextPageButton: Locator;
    readonly minimumEntriesMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.addEntryButton = page.getByRole('button', { name: 'Add Entry' });
        this.activityNameInput = page.getByRole('textbox', { name: 'Extracurricular Activity Name' });
        this.yearsInvolvedInput = page.getByRole('textbox', { name: 'Total Number of Years Involved' });
        this.leadershipRolesInput = page.getByRole('textbox', { name: 'List any leadership roles,' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description of Involvement' });
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.nextPageButton = page.getByRole('button', { name: 'Next Page' });
        this.minimumEntriesMessage = page.getByText('Please add at least 2 entries');
    }

    async navigate(): Promise<void> {
        // This page is accessed after personal info
    }

    async isPageLoaded(): Promise<boolean> {
        return this.addEntryButton.first().isVisible();
    }

    async addExtracurricularActivity(activity: UserData['extracurriculars'][0]): Promise<void> {
        await this.addEntryButton.first().click();
        await this.activityNameInput.fill(activity.name);
        await this.yearsInvolvedInput.fill(activity.years);
        await this.leadershipRolesInput.fill(activity.leadership);
        await this.descriptionInput.fill(activity.description);
        await this.addButton.click();
    }

    async fillAllExtracurriculars(activities: UserData['extracurriculars']): Promise<void> {
        for (const activity of activities) {
            await this.addExtracurricularActivity(activity);
        }

        await this.nextPageButton.click();
        await this.nextPageButton.click();
        this.page.waitForTimeout(3000)
    }
}