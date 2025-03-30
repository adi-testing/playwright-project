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

  async selectCurrency(currency: string) {
    // Locate the parent element that triggers the dropdown menu
    const currencyTrigger = this.page.locator('li:has-text("$ US Dollar")').first();

    // Wait for the element to be attached to the DOM and visible
    await currencyTrigger.waitFor({ state: 'attached' });
    await currencyTrigger.waitFor({ state: 'visible' });

    // Ensure the element is in the viewport
    await currencyTrigger.scrollIntoViewIfNeeded();

    // Hover over the parent element to make the dropdown visible
    await currencyTrigger.hover();

    // Wait for the dropdown menu to become visible
    const currencyDropdown = this.page.locator('ul.dropdown-menu.currency');
    await currencyDropdown.waitFor({ state: 'visible' });

    // Locate the specific currency option by its text
    const currencyOption = this.page.locator(`ul.dropdown-menu.currency a:has-text("${currency}")`);

    // Click the desired currency option
    await currencyOption.click();

    // Verify the selected currency by checking the URL or page content
    const selectedCurrencyText = await this.page.locator(`li:has-text("${currency}")`).nth(1).textContent();
    if (!selectedCurrencyText?.includes(currency)) {
        throw new Error(`Failed to select currency: Expected "${currency}", but got "${selectedCurrencyText?.trim()}"`);
    }
  }
}
