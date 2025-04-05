import { test, expect } from '@playwright/test';
import { Header, HomePage } from '../pages';
import { clearReport } from './utils';

// Declare variables to store instances of page objects for reuse across tests
let header: Header;
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

    // Initialize page objects for header interactions
    header = new Header(page);
    homePage = new HomePage(page);

    // Navigate to the home page
    await homePage.goto();
});

test(('Select currency'), async () => {
    // Define the currency to select
    const currency = 'Sterling';

    // Select the currency from the dropdown
    await header.selectCurrency(currency);
});

test.describe('Dropdown Menu', () => {
    test('Check Apparel & Accessories', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Apparel & accessories';
        const links = ['Shoes', 'T-shirts'];

        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Makeup', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Makeup';
        const links = ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails'];

        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Skincare', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Skincare';
        const links = ['Eyes', 'Face', 'Gift Ideas & Sets', 'Hands & Nails', 'Sun'];

        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Fragrance', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Fragrance';
        const links = ['Men', 'Women']; 

        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });  
      
    test('Check Men', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Men';
        const links = ['Body & Shower', 'Fragrance Sets', 'Pre-Shave & Shaving', 'Skincare'];
    
        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Hair Care', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Hair Care';
        const links = ['Conditioner', 'Shampoo'];
    
        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Books', async () => {
        // Define the title and expected options for the dropdown
        const category = 'Books';
        const links = ['Audio CD', 'Paperback'];
    
        // Check the dropdown options
        await header.verifyDropDownOptions(category, links);
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