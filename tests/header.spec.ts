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

test('Select currency', {
    annotation: {
        type: 'ui-settings',
        description: 'Validates the ability to select and apply a currency from the dropdown menu in the header.'
    }
}, async () => {
    // Define the currency to select
    const currency = 'Sterling';

    // Select the currency from the dropdown
    await header.selectCurrency(currency);
});

test.describe('Dropdown Menu', {
    annotation: {
        type: 'ui-navigation',
        description: 'Validates the dropdown menu categories and their respective options on the header navigation bar.'
    }
}, () => {

    test('Check Apparel & Accessories', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Apparel & Accessories" are displayed correctly.'
        }
    }, async () => {
        const category = 'Apparel & accessories';
        const links = ['Shoes', 'T-shirts'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Makeup', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Makeup" are displayed correctly.'
        }
    }, async () => {
        const category = 'Makeup';
        const links = ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Skincare', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Skincare" are displayed correctly.'
        }
    }, async () => {
        const category = 'Skincare';
        const links = ['Eyes', 'Face', 'Gift Ideas & Sets', 'Hands & Nails', 'Sun'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Fragrance', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Fragrance" are displayed correctly.'
        }
    }, async () => {
        const category = 'Fragrance';
        const links = ['Men', 'Women'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Men', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Men" are displayed correctly.'
        }
    }, async () => {
        const category = 'Men';
        const links = ['Body & Shower', 'Fragrance Sets', 'Pre-Shave & Shaving', 'Skincare'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Hair Care', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Hair Care" are displayed correctly.'
        }
    }, async () => {
        const category = 'Hair Care';
        const links = ['Conditioner', 'Shampoo'];
        await header.verifyDropDownOptions(category, links);
    });

    test('Check Books', {
        annotation: {
            type: 'ui-navigation',
            description: 'Ensures the dropdown options under "Books" are displayed correctly.'
        }
    }, async () => {
        const category = 'Books';
        const links = ['Audio CD', 'Paperback'];
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