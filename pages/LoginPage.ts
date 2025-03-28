import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(username: string, password: string) {
        const loginNameInput = this.page.locator('#loginFrm_loginname');
        const passwordInput = this.page.locator('#loginFrm_password');
        const loginButton = this.page.locator('button:has-text("Login")');

        // Fill the username
        await loginNameInput.fill(username);

        // Fill the password
        await passwordInput.fill(password);

        // Click the login button
        await loginButton.click(); 
    }
}
