import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test('Login with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToLogin();
    
    const loginPage = new LoginPage(page);
    await loginPage.login('testuser', 'testpassword');

    await expect(page.getByText('× Error: Incorrect login or')).toBeVisible();
});
