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
        const category = this.page.locator(`a[href*="product/category"]:has-text("${categoryName}")`);
        await category.click();
    }

    async selectProduct(productName: string) {
        // Select the product
        const product = this.page.locator(`a:has-text("${productName}")`);
        await product.click();
    }

    async selectProductFromTab(categoryName: string, productName: string) {
        // Hover over the category
        const category = this.page.locator(`a[href*="product/category"]:has-text("${categoryName}")`);
        await category.hover();

        // Click on the product
        const product = this.page.locator(`a:has-text("${productName}")`);
        await product.click();
    } 

    async selectItem(itemName: string) {
        // Select the item name
        const item = this.page.locator(`a[title="${itemName}"]`);
        await item.click();
    }

    async updateQuantity(quantity: number) {
        // Focus on the quantity input
        const quantityInput = this.page.locator('input[name="quantity"]');
        await quantityInput.click();

        // Select all existing text in the input
        await quantityInput.press('Control+a');

        // Fill the input with the new quantity
        await quantityInput.fill(String(quantity));
    }

    async selectCheckboxSize(size: string) {
        // Check the checkbox
        await this.page.getByLabel(size).check();

        // Select the size
        //const sizeOption = this.page.locator(`text="${size}"`);
        //await sizeOption.click();
    }

    async selectColorDropdownMenu(color: string) {
        // Locate the element containing the color
        const element = this.page.locator("label:has-text('Colour')");

        // Locate the dropdown menu for the color
        const colorOption = element.locator(`select[name*="option"]`);

        // Select the color option
        await colorOption.locator(`option:has-text("${color}")`).click();
    }

    async clickAddToCart() {
        // Locate the "Add to Cart" button
        const addToCartButton = this.page.locator('a.cart:has-text("Add to Cart")');
    
        // Click the button
        await addToCartButton.click();
    }

}




