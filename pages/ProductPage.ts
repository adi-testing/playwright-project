import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly quantityInput: Locator;
    readonly productSize: Locator;
    readonly productColor: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async selectProductCategory(categoryName: string) {
        // Select the product category
        const category = this.page.locator(`a[href*="product/category"]:has-text("${categoryName}")`).first();
        await category.click();
    }

    async selectProduct(productName: string) {
        // Select the product
        const product = this.page.locator(`a:has-text("${productName}")`);
        await product.click();
    }

    async selectProductFromTab(categoryName: string, productName: string) {
        // Hover over the category
        const category = this.page.locator(`a[href*="product/category"]:has-text("${categoryName}")`).nth(0); // Use nth(0) for the first match
        await category.hover();

        // Click on the product
        const product = this.page.locator(`a:has-text("${productName}")`).nth(0); // Use nth(0) for the first match
        await product.click();
    } 

    async selectItem(itemName: string) {
        // Select the item name
        const item = this.page.getByTitle(itemName);

        // Click on the item
        await item.click();
    }

    async updateQuantity(quantity: number) {
        // Focus on the quantity input
        const quantityInput = this.page.locator('input[name="quantity"]');

        // Select all existing text in the input
        await quantityInput.press('Control+a');

        // Fill the input with the new quantity
        await quantityInput.fill(String(quantity));
    }

    async selectCheckboxOption(option: string) {
        // Check the checkbox
        await this.page.getByLabel(option).check();
    }

    async selectDropdownOption(option: string) {
        // Locate the dropdown menu
        const dropdown = this.page.locator(`select[id*="option"]`);
 
        // Select the option by its label (text) using the build-in method selectOption
        await dropdown.selectOption({ label: option });
    }

    async clickAddToCart() {
        // Locate the "Add to Cart" button
        const addToCartButton = this.page.locator('a.cart:has-text("Add to Cart")');
          
        // Click the button
        await addToCartButton.click();
    }

}




