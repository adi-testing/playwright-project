import { test } from './fixtures';

test.beforeAll('Setup', async () => {
    console.log("Starting all tests in file");
});

test.describe('Add products into cart', {
    annotation: {
        type: 'ui-cart',
        description: 'Tests for adding products to the cart and verifying their details.'
    }
}, () => {    
    test('Buy lipstick', {
        annotation: {
            type: 'ui-cart',
            description: 'Validates adding a lipstick to the cart and verifying its quantity.'
        }
    }, async ({ productPage, cartPage, homePage }) => {
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

    test('Buy shoes', {
        annotation: {
            type: 'ui-cart',
            description: 'Validates adding shoes to the cart and verifying their size, color, and quantity.'
        }
    }, async ({ productPage, cartPage, homePage }) => {
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

    test('Flow testing - Buy multiple products', {
        annotation: {
            type: 'ui-cart',
            description: 'Validates adding multiple products to the cart in a single flow and verifying their details.'
        }
    }, async ({ productPage, cartPage, homePage }) => {
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

test.afterAll('Teardown', async () => {
    console.log("Finished all tests in file");
});
