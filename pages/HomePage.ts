import { Page, Locator, expect } from '@playwright/test';

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
    await this.page.getByText(/US Dollar/i).first().hover();

    // Click the desired currency option 
    await this.page.locator(`ul.dropdown-menu.currency a:has-text("${currency}")`).click();

    // Verify the selected currency by checking the URL or page content
    const selectedCurrencyText = await this.page.locator(`li:has-text("${currency}")`).nth(1).textContent();
    if (!selectedCurrencyText?.includes(currency)) {
        throw new Error(`Failed to select currency: Expected "${currency}", but got "${selectedCurrencyText?.trim()}"`);
    }
  }

  async checkDropDownOptions(title: string, option: string[]) {
    // Locate the parent element that triggers the dropdown menu
    const dropdownTrigger = this.page.getByText(new RegExp(title, 'i')).first();

    // Hover over the dropdown trigger to display the menu
    await dropdownTrigger.hover();

    // Get all list elements from the dropdown menu
    //const listItems = await this.page.getByRole('listitem').allTextContents();
    const listItems = await dropdownTrigger.locator('..').getByRole('listitem').allTextContents();
    
    // Trim whitespace from each list item
    const trimmedListItems = listItems.map(item => item.trim());
    
    // Log the trimmed list items
    console.log('Dropdown options (trimmed):', trimmedListItems);

    // Assert that the dropdown options contain the expected values
    await expect(trimmedListItems).toEqual(expect.arrayContaining(option));

  }
}
