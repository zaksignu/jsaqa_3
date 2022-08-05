
//  Content of user.js
// export let userParams={
//   eMail: '',
//   pass: ''
// };

import { userParams } from '../../user';

let userParam = userParams;

const { test, expect } = require('@playwright/test');

test('Succes auth for Netology', async ({ page }) => {

  // Go to https://netology.ru/
  await page.goto('https://netology.ru/',{ waitUntil:"domcontentloaded"});
  // Click text=Войти
  await page.screenshot({ path: './screen/01_index.jpg' });
  await page.click('text=Войти');
  //console.log(userLogin);
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in',{ waitUntil:"domcontentloaded"});
  await page.screenshot({ path: './screen/02_signin_form.jpg' });
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', userParam.eMail);
  // Click [placeholder="Пароль"]
  await page.click('[placeholder="Пароль"]');
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', userParam.pass);
  // Click [data-testid="login-submit-btn"]
  await page.screenshot({ path: './screen/03_full_signin_form.jpg' });
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL('https://netology.ru/profile',{ waitUntil:"domcontentloaded"});
  await page.screenshot({ path: './screen/04_profile.jpg' });
  await expect(page.locator(`[class="src-components-pages-Profile-Programs--title--Kw5NH"]`)).toHaveText('Мои курсы и профессии');
});

