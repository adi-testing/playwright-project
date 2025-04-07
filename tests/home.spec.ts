import { test } from './fixtures';

test.beforeAll('Setup', async () => {
    console.log("Starting all tests in file");
});

// Under development

test.afterAll('Teardown', async () => {
    console.log("Finished all tests in file");
});
