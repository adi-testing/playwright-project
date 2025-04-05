import { Page, Locator, expect } from "@playwright/test";

export class Header {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCurrency(currency: string) {
        // Locate the parent element that triggers the dropdown menu
        await this.page.locator('a').filter({ hasText: /US Dollar|Euro|Pound/i }).first().hover();
    
        // Click the desired currency option 
        //await this.page.locator(`ul.dropdown-menu.currency a:has-text("${currency}")`).click(); 
        await this.page.getByRole('link', { name: new RegExp(currency, 'i') }).click();
   
        // Verify the selected currency by checking the URL or page content
        const selectedCurrencyText = await this.page.locator(`li:has-text("${currency}")`).nth(1).textContent();
        if (!selectedCurrencyText?.includes(currency)) {
            throw new Error(`Failed to select currency: Expected "${currency}", but got "${selectedCurrencyText?.trim()}"`);
        }
      }

      async verifyDropDownOptions(category: string, links: string[]) {
        // Locate the parent element that triggers the dropdown menu   
        const categoryTitle = this.page.getByRole('link', { name: new RegExp(category, 'i') }).first()

        // Hover over the dropdown trigger to display the menu
        await categoryTitle.hover();

        // Locate all links within the dropdown menu
        const linkItems = await categoryTitle.locator('..').getByRole('link').allTextContents();

        // Trim whitespace from each list item
        const trimmedListItems = linkItems.map(link => link.trim());
        
        // Log the trimmed list items
        console.log('Dropdown link texts (trimmed):', trimmedListItems);
    
        // Assert that the dropdown options contain the expected values
        await expect(trimmedListItems).toEqual(expect.arrayContaining(links));    
      }
}

