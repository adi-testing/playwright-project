import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { beforeEach } from 'node:test';

test.beforeEach(async ({ page }) => {
    // Run before each test
    const homePage = new HomePage(page);
    await homePage.goto();
});

test.describe('Add product into cart', () => {
    
    test('Buy a lipstick', async ({ page }) => {
        const productPage = new ProductPage(page);
        // Selet the product category
        await productPage.selectProductFromTab('Makeup', 'Lips');
        // Select the product
        await productPage.selectItem('Viva Glam Lipstick');
        // Update the quantity and add to cart
        await productPage.updateQuantity(5);
        await productPage.clickAddToCart();
    });

    test('Buy shoes', async ({ page }) => {
        const productPage = new ProductPage(page);
        // Select the product category
        await productPage.selectProductFromTab('Apparel & accessories', 'Shoes');
        // Select the product
        await productPage.selectItem('New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals');
        // Update the quantity
        await productPage.updateQuantity(2);
        // Select the size
        await productPage.selectSize('5 UK');
        // Add to cart
        await productPage.clickAddToCart();
    });

    
});