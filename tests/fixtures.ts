import { test as base } from '@playwright/test';
import { HomePage, Header, CartPage, ProductPage, LoginPage } from '../pages';

export const test = base.extend<{
    header: Header;
    homePage: HomePage;
    cartPage: CartPage;
    productPage: ProductPage;
    loginPage: LoginPage;
}>({
    header: async ({ page }, use) => {
        const header = new Header(page);
        await use(header);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto(); // Navigate to the home page
        await use(homePage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },  
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});