import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a:has-text("Login or register")');
    this.searchInput = page.locator('input[name="search"]');
  }

  async goto() {
    await this.page.goto('https://automationteststore.com/');
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}
