import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PersonalInfoPage } from '../pages/personal-info-page';
import { ExtracurricularPage } from '../pages/extracurricular-page';
import { EducationPage } from '../pages/education-page';
import { EssayPage } from '../pages/essay-page';
import { testUser } from '../testdata';
import { Helpers } from '../utils/helpers';
import path from 'path';

test.describe('Scholarship Application', () => {
    test('Complete scholarship application', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const personalInfoPage = new PersonalInfoPage(page);
        const extracurricularPage = new ExtracurricularPage(page);
        const educationPage = new EducationPage(page);
        const essayPage = new EssayPage(page);

        // Generate random email
        const email = Helpers.generateRandomEmail();
        const password = testUser.password;



        await loginPage.navigate();
        await loginPage.Register(
            email,
            password,
            {
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                phone: testUser.phone
            }
        );
        await personalInfoPage.fillPersonalInfo(testUser.address);
        await extracurricularPage.fillAllExtracurriculars(testUser.extracurriculars);
        await educationPage.fillEducationInfo(testUser.education);
        await essayPage.fillEssays(testUser.essays);
        await essayPage.verifyEssays();
        await essayPage.submitApplication();
        await essayPage.verifySubmissionSuccess();
    });
});