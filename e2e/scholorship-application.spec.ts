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


        //navigate to page
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
        // personal page date filling
        await personalInfoPage.fillPersonalInfo(testUser.address);
        //Fill ExtracurricularPage activities
        await extracurricularPage.fillAllExtracurriculars(testUser.extracurriculars);
        //Fill education related information
        await educationPage.fillEducationInfo(testUser.education);
        //Fill Essays
        await essayPage.fillEssays(testUser.essays);
        //Verify essays are appearing
        await essayPage.verifyEssays();
        //submite application
        await essayPage.submitApplication();
        //Verify submission
        await essayPage.verifySubmissionSuccess();
    });
});