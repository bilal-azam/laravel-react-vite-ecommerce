import { test, expect } from '@playwright/test';

test('Clicks on a specific navigation item and waits for loading to complete', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test=navigation]').locator('text=Products').click();
});

test('Visits /products and waits for loading then click on a product and add it to the cart', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-test="loading"]');
    await page.waitForSelector('[data-test="loading"]', { state: 'hidden', timeout: 5000 });

    await page.locator('[data-test="product-1"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForURL('/login');
});

test('logins and adds a product to the cart', async ({ page }) => {
    await page.goto('/login');
    await page.locator('[data-test="email"]').type('barrett.parisian@example.com');
    await page.locator('[data-test="password"]').type('password');
    await page.locator('[data-test="sign-in"]').click();

    await page.locator('[data-test="product-1"]').click();
    await page.waitForTimeout(1000);
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(2000);

    await page.locator('[data-test="shopping-cart"]').click();
    page.locator('[data-test="cart-item-0"]');
    expect(await page.locator('[data-test="quantity"]').innerText()).toBe('1');
    await page.locator('[data-test="add-quantity"]').click();
    await page.waitForTimeout(2000);
    expect(await page.locator('[data-test="quantity"]').innerText()).toBe('2');
    await page.locator('[data-test="subtract-quantity"]').click();
    await page.waitForTimeout(2000);
    expect(await page.locator('[data-test="quantity"]').innerText()).toBe('1');
    await page.locator('[data-test="remove-from-cart"]').click();
    await page.waitForTimeout(2000);
    page.locator('[data-test="empty-cart"]');
    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    await expect(page).toHaveURL('/login');
});

test('API tests', async ({ page }) => {
    const response = await page.goto('http://localhost:8000/api/products');
    const products = await response.json();

    expect(response.status()).toBe(200);
    expect(products.length).toBeGreaterThanOrEqual(1);

    for (const product of products) {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('mainPhoto');
        expect(product).toHaveProperty('price');
    }
});
