import { Page, Locator } from "@playwright/test";

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
        this.quantityInput = page.locator('input[name="quantity"]');
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

    async inputQuantity(quantity: number) {
        // Focus on the quantity input
        await this.quantityInput.click();

        // Select all existing text in the input
        await this.quantityInput.press('Control+a');

        // Fill the input with the new quantity
        await this.quantityInput.fill(String(quantity));
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
        const productRow = this.page.locator(`tr:has-text("${productName}")`); // Template literal to dynamically insert the product name

        // Get the remove button within the row
        const removeButton = this.getRemoveButton(productRow);

        // Click the remove button in the row
        await removeButton.click();
    }
}