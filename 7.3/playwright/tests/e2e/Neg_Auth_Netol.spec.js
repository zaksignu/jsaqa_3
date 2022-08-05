import { userParams } from '../../user';

let userParam = userParams;
const { test, expect } = require('@playwright/test');

test('Unsucces auth for Netology', async ({ page }) => {

    // Go to https://netology.ru/
    await page.goto('https://netology.ru/',{ waitUntil:"domcontentloaded"});
    // Click text=Войти
    await page.click('text=Войти');
    //console.log(userLogin);
    await expect(page).toHaveURL('https://netology.ru/?modal=sign_in',{ waitUntil:"domcontentloaded"});
    // Click [placeholder="Email"]
    await page.click('[placeholder="Email"]');
    // Fill [placeholder="Email"]
    await page.fill('[placeholder="Email"]', userParam.eMail);
    // Click [placeholder="Пароль"]
    await page.click('[placeholder="Пароль"]');
    // Fill [placeholder="Пароль"]
    await page.fill('[placeholder="Пароль"]', '1234');
    // Click [data-testid="login-submit-btn"]
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page).toHaveURL('https://netology.ru/?modal=sign_in',{ waitUntil:"domcontentloaded"});
    await expect(page.locator(`[data-testid="login-error-hint"]`)).toHaveText('Вы ввели неправильно логин или пароль');
  });
  