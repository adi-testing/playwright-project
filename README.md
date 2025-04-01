# Web Test Automation Using Playwright

This repository is an example of a Playwright-based end-to-end testing framework designed for testing web applications. It includes reusable page object models, utility functions, and a structured test setup to ensure maintainable and scalable test automation.

## Features

- **End-to-End Testing**: Automates user workflows and validates application behavior.
- **Page Object Model (POM)**: Organized and reusable page classes for better test maintainability.
- **Utility Functions**: Shared utilities like `clearReport` for managing test reports and other common tasks.
- **Test Hooks**: Pre-test and post-test hooks (`beforeAll`, `beforeEach`) for setup and teardown.
- **Cross-Browser Testing**: Supports testing across Chromium, Firefox, and WebKit.
- **Detailed Reports**: Generates test execution reports for debugging and analysis.

## Website Under Test

This project is designed to test the functionalities of [Automation Test Store](https://automationteststore.com/), a demo e-commerce website. The tests cover various workflows such as navigation, login, product search, and cart management.

### Credit and Disclaimer
This project uses [Automation Test Store](https://automationteststore.com/) as the website under test. All tests are conducted for **educational purposes only**, as the author is still learning Playwright. No commercial use or harm to the website is intended.

## Setup Instructions

Follow these steps to set up and run the project:

### 1. Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/) (v16 or later).

### 2. Clone the Repository
```bash
git clone https://github.com/rallymodus/playwright-project.git
cd playwright-project
```

### 3. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

### 4. Install Playwright
Install Playwright and its required dependencies using the following command:
```bash
npx playwright install
```

This will download the necessary browser binaries (Chromium, Firefox, and WebKit) for Playwright to run tests.

### 5. Run Tests
Run all tests using Playwright:
```bash
npx playwright test
```

### 6. View Test Reports
After running the tests, view the generated report:
```bash
npx playwright show-report
```

### 7. Clear Test Reports
Use the `clearReport` utility to clean up the `playwright-report` directory before running new tests:
```typescript
import { clearReport } from './tests/utils';
clearReport();
```

## Writing Tests

- Use the **Page Object Model** to create reusable components for your tests.
- Example test (`home.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Verify homepage title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Verify the title of the homepage
    await expect(page).toHaveTitle('Automation Test Store');
});
```

## Playwright Configuration

The `playwright.config.ts` file allows you to configure:
- Browsers (Chromium, Firefox, WebKit)
- Test timeouts
- Base URL for your application
- Reporters for test results

## Ongoing Development

This is an **ongoing project** that will be updated frequently with new tests, features, and improvements. Stay tuned for updates!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




