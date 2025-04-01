import { test, expect, Browser, BrowserContext } from '@playwright/test';
import { HomePage, CartPage, ProductPage } from '../pages';
import { clearReport } from './utils';

// Declare variables to store instances of page objects for reuse across tests
let productPage: ProductPage;
let cartPage: CartPage;
let homePage: HomePage;

test.beforeAll('Setup', async () => {
    console.log("Starting all tests in file");

    // Clear the playwright-report directory before running tests
    clearReport();
});

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

test('Select currency', async ({ page }) => {
    // Define the currency to select
    const currency = 'Sterling';

    // Select the currency
    await homePage.selectCurrency(currency);
});

test.describe.fixme('Check Dropdown Menu - Broken tests than should be fixed', () => {
    test('Check Home Menu', async ({ page }) => {
        // Define the title and expected options for the dropdown
        const title = 'HOME';
        const options = ['Specials', 'Account', 'Cart', 'Checkout'];

        // Check the dropdown options
        await homePage.checkDropDownOptions(title, options);
    });

    test('Check Makeup Menu', async ({ page }) => {
        // Define the title and expected options for the dropdown
        const title = 'MAKEUP';
        const options = ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails'];

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

test.afterAll('Teardown', async () => {
    console.log("Finished all tests in file");
});
