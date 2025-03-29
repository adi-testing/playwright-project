import { test, expect } from '@playwright/test';
import { HomePage, CartPage, ProductPage } from '../pages';
import { beforeEach } from 'node:test';

// Declare variables to store instances of page objects for reuse across tests

// `productPage`: Represents the product page where product selection and interactions occur
let productPage: ProductPage;

// `cartPage`: Represents the cart page where cart-related actions and verifications are performed
let cartPage: CartPage;

// `homePage`: Represents the home page for navigation and initial setup
let homePage: HomePage;

test.beforeEach(async ({ page }, testInfo) => {
    // Initialize page objects for home page, product, and cart interactions
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    homePage = new HomePage(page);

    // Navigate to the home page
    await homePage.goto();
});

test.describe('Add products into cart', () => {    
    test('Buy lipstick', async ({ page }) => {
        // Define variables
        const productName = 'Viva Glam Lipstick';
        const productQuantity = 5;

        // Select the product category
        await productPage.selectProductFromTab('Makeup', 'Lips');

        // Select the product
        await productPage.selectItem(productName);

        // Update the quantity and add to cart
        await productPage.updateQuantity(productQuantity);
        await productPage.clickAddToCart();

        // Check if the product is in the cart
        await cartPage.checkProductInCart(productName);

        // Check if the product quantity is correct
        await cartPage.checkProductQuantity(productName, productQuantity);
    });

    test('Buy shoes', async ({ page }) => {
        // Define variables
        const productName = 'New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals';
        const productQuantity = 2;   
        const productSize = '5 UK';
        const productColor = 'red';

        // Select the product category
        await productPage.selectProductFromTab('Apparel & accessories', 'Shoes');

        // Select the product
        await productPage.selectItem(productName);

        // Update the quantity
        await productPage.updateQuantity(productQuantity);

        // Select the size
        await productPage.selectCheckboxOption(productSize);

        // Pick the color
        await productPage.selectDropdownOption(productColor);

        // Add to the cart
        await productPage.clickAddToCart();

        // Verify the product is in the cart and its size and color are correct
        await cartPage.checkProductInCart(productName);
        await cartPage.checkProductInformation(productName, productSize);
        await cartPage.checkProductInformation(productName, productColor);
    });

    test('Flow testing - Buy multiple products', async ({ page }) => {
        // Define variables
        const productName_1 = 'Waterproof Protective Undereye Concealer';
        const productQuantity_1 = 3;
        const productName_2 = 'Tropiques Minerale Loose Bronzer';
        const productQuantity_2 = 1;
        const productColor_1 = 'Bronze';
        const productColor_2 = 'Natural Golden';

        // Select the product category
        await productPage.selectProductFromTab('Makeup', 'Eyes');

        // Select the product
        await productPage.selectItem(productName_1);

        // Update the quantity and add to cart
        await productPage.updateQuantity(productQuantity_1);

        // Pick the color
        await productPage.selectDropdownOption(productColor_1);

        // Add to the cart
        await productPage.clickAddToCart();

        // Select the product category
        await productPage.selectProductFromTab('Makeup', 'Cheeks');

        // Select the product
        await productPage.selectItem(productName_2);

        // Pick the color
        await productPage.selectDropdownOption(productColor_2);

        // Update the quantity and add to cart
        await productPage.updateQuantity(productQuantity_2);

        // Add to the cart
        await productPage.clickAddToCart();
    });

    
});