import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { clearReport } from './utils';

test.beforeAll('Setup', async () => {
    console.log("Starting all tests in file");

    // Clear the playwright-report directory before running tests
    clearReport();
});

test('Login with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToLogin();
    
    const loginPage = new LoginPage(page);
    await loginPage.login('testuser', 'testpassword');

    await expect(page.getByText('× Error: Incorrect login or')).toBeVisible();
});

test.afterAll('Teardown', async () => {
    console.log("Finished all tests in file");
});

