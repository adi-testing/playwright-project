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
    
        await loginNameInput.fill(username); // Fill the username
        await passwordInput.fill(password); // Fill the password
        await loginButton.click(); // Click the login button
    }
}
