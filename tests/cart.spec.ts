import { test, expect } from '@playwright/test';
import { HomePage, CartPage, ProductPage } from '../pages';
import { beforeEach } from 'node:test';

test.beforeEach(async ({ page }) => {
    // Run before each test
    const homePage = new HomePage(page);
    await homePage.goto();
});

test.describe('Add products into cart', () => {
    
    test('Buy lipstick', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        // Selet the product category
        await productPage.selectProductFromTab('Makeup', 'Lips');

        // Select the product
        await productPage.selectItem('Viva Glam Lipstick');

        // Update the quantity and add to cart
        await productPage.updateQuantity(5);
        await productPage.clickAddToCart();

        // Check if the product is in the cart
        await cartPage.checkProductInCart('Viva Glam Lipstick');

        // Check if the product quantity is correct
        await cartPage.checkProductQuantity('Viva Glam Lipstick', 5);
    });

    test('Buy shoes', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        // Define variables
        const productName = 'New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals';
        const productSize = '5 UK';
        const productColor = 'red';

        // Select the product category
        await productPage.selectProductFromTab('Apparel & accessories', 'Shoes');

        // Select the product
        await productPage.selectItem(productName);

        // Update the quantity
        await productPage.updateQuantity(2);

        // Select the size
        await productPage.selectCheckboxSize(productSize);

        // Select the color
        //await productPage.selectColorDropdownMenu(productColor);

        // Add to the cart
        await productPage.clickAddToCart();

        // Check the product information in the cart
        await cartPage.checkProductInCart(productName);
        await cartPage.checkProductInformation(productName, productSize);
        await cartPage.checkProductInformation(productName, productColor);
    });

/*     test('Flow testing - Buy multiple products', async ({ page }) => {
        const productPage = new ProductPage(page);

        // Select the product category
        await productPage.selectProductFromTab('Makeup', 'Eyes');

        // Select the product
        await productPage.selectItem('Waterproof Protective Undereye Concealer');

        // Update the quantity and add to cart
        await productPage.updateQuantity(3);
        await productPage.clickAddToCart();

        // Select the product category
        await productPage.selectProductFromTab('Makeup', 'Cheeks');

        // Select the product
        await productPage.selectItem('Tropiques Minerale Loose Bronzer');

        // Update the quantity and add to cart
        await productPage.updateQuantity(1);
        await productPage.clickAddToCart();
    }); */

    
});