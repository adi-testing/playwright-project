import { Page, Locator, expect } from "@playwright/test";
import { title } from "process";

export class CartPage {
    readonly page: Page;
    readonly continueButton: Locator;
    readonly checkoutButton: Locator;
    readonly quantityInput: Locator;
    readonly updateButton: Locator;
    readonly applyCouponButton: Locator;
    readonly couponCodeInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('a[title*="Continue"]');
        this.checkoutButton = page.locator('a:has-title("Checkout")');
        this.updateButton = page.locator('a:has-title("Update")');
        this.applyCouponButton = page.locator('a:has-title("Apply Coupon")');
        this.couponCodeInput = page.locator('input[name="coupon"]');
    }
    
    async goToCheckout() {
        // Click the checkout button
        await this.checkoutButton.click();
    }

    async continueShopping() {
        // Click the continue button
        await this.continueButton.click();
    }

    async inputQuantity(productName: string, quantity: number) {
        // Focus on the quantity input
        const quantityInput = this.page.locator(`tr:has-text("${productName}") input[name="quantity"]`);
        await quantityInput.click();

        // Select all existing text in the input
        await quantityInput.press('Control+a');

        // Fill the input with the new quantity
        await quantityInput.fill(String(quantity));
    }

    async checkProductInCart(product: string) {
        //Locate the element containing the product name. Target the second cell in the table row (nth(1))
        const element = this.page.locator(`a:has-text("${product}")`).nth(1);

        // Check if the product is displayed
        const isVisible = await element.isVisible();

        // Throw an error if the product is not displayed
        if (!isVisible) {
            throw new Error(`"${product}" not found`);
        }
    }

    async checkProductInformation(product: string, info: string) {
        // Locate the table row containing the product name
        const productRow = this.page.locator(`#cart tr:has-text("${product}")`);

        // Locate the element containing the product information (e.g., size, color)
        const infoElement = productRow.locator(`small:has-text("${info}")`);
  
        // Check if the product information is displayed
        const isVisible = await infoElement.isVisible();

        // Soft assertion: Verify if the product information is displayed
        expect(isVisible, `Product information "${info}" for "${product}" is not visible`).toBeTruthy();
    }

    async checkProductQuantity(productName: string, quantity: number) {
        // Locates a table row (`<tr>`) element on the page that contains the specified product name.
        const productRow = this.page.locator(`tr:has-text("${productName}")`);
        
        // Locator for the quantity input field within a product row.             
        const quantityInput = productRow.locator('input[name*="quantity"]');
        
        // Get the current value of the quantity input
        const actualQuantity = await quantityInput.inputValue();

        // Assert that the actual quantity matches the expected quantity
        if (actualQuantity != String(quantity)) {
            throw new Error(`Expected quantity ${quantity}, but found ${actualQuantity}`);
        }
    }

    async clickUpdateButton() {
        // Click the update button
        await this.updateButton.click();
    }

    async inputCouponCode(couponCode: string) {
        // Focus on the coupon code input
        await this.couponCodeInput.click();

        // Select all existing text in the input
        await this.couponCodeInput.press('Control+a');

        // Fill the input with the new coupon code
        await this.couponCodeInput.fill(couponCode);
    }

    async clickApplyCouponButton() {
        // Click the apply coupon button
        await this.applyCouponButton.click();
    }

    private getRemoveButton(productRow: Locator) {
        return productRow.locator('a.btn.btn-sm.btn-default[href*="remove"]');
    }

    async removeProduct(productName: string) {
        //Locate the table row containing the product name
        const productRow = this.page.locator(`a:has-text("${productName}")`).nth(1);

        // Get the remove button within the row
        const removeButton = this.getRemoveButton(productRow);

        // Click the remove button in the row
        await removeButton.click();
    }
}