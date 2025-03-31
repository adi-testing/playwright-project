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
    // Log the test name
    console.log(`Running test: ${testInfo.title}`);
    // Log the test file name
    console.log(`Test file: ${testInfo.file}`);

    // Initialize page objects for home page, product, and cart interactions
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    homePage = new HomePage(page);

    // Navigate to the home page
    await homePage.goto();
});

test.describe('Basic functionality', () => {
    test('Select currency', async ({ page }) => {
        // Define the currency to select
        const currency = 'Sterling';

        // Select the currency
        await homePage.selectCurrency(currency);
    });

    test('Check dropdown options', async ({ page }) => {
        // Define the title and expected options for the dropdown
        const title = 'Home';
        const options = ['Cart'];

        // Check the dropdown options
        await homePage.checkDropDownOptions(title, options);
    });
});

test.afterEach(async ({ page }, testInfo) => {
    // Log the test name
    console.log(`Finished test: ${testInfo.title}`);

    // Log the test duration
    console.log(`Test duration: ${testInfo.duration}ms`);

    // Log the test status
    console.log(`Test status: ${testInfo.status}`);

    if (testInfo.status === 'failed') {
        // Take a screenshot if the test fails
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }

    // Close the page after each test
    await page.close();
});
