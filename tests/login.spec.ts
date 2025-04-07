import { test } from './fixtures';

test.beforeAll('Setup', async () => {
    console.log("Starting all tests in file");

});

test('Login with invalid credentials', async ({ homePage, loginPage }) => {

    // Go to the login page
    await homePage.goToLogin();
    
    // Verify the URL
    await loginPage.login('testuser', 'testpassword');

    // Verify the error message
    await loginPage.verifyErrorMessage();
});

test.afterAll('Teardown', async () => {
    console.log("Finished all tests in file");
});

