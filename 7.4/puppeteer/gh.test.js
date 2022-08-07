let page;

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click(); 
    await page.waitForSelector('h1');
    await page.waitForTimeout(1000);
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  },60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  },10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  },10000);
});

describe("Additional Github page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  test("Mobile page from header", async () => {
    await page.hover("div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > nav > ul > li:nth-child(1) > details");
    const firstLink = await page.$(" div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > nav > ul > li:nth-child(1) > details > div > ul > li:nth-child(2) > a");
    await firstLink.click(); 
    await page.waitForTimeout(3000);
    const title2 = await page.title();
    expect(title2).toEqual('GitHub Mobile · GitHub');
  },10000);

  test("Enterpise page from header", async () => {
    const firstLink = await page.$(" div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > nav > ul > li:nth-child(3) > a");
    await firstLink.click(); 
    await page.waitForTimeout(3000);
    const title2 = await page.title();
    expect(title2).toEqual('Enterprise · A smarter way to work together · GitHub');
  },10000);

  test("Marketplace page from header", async () => {
    const firstLink = await page.$("div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > nav > ul > li:nth-child(5) > a");
    await firstLink.click(); 
    await page.waitForTimeout(1000);
    const title2 = await page.title();
    expect(title2).toEqual('GitHub Marketplace · to improve your workflow · GitHub');
  },10000);
});
  
describe("Netology page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru/",{ waitUntil:"domcontentloaded"});
  });

  test("Free studying page from header", async () => {
    await page.waitForTimeout(5000);
    const firstLink = await page.$("div > div.src-shared-components-Header--contentWrapper--Tbhhv > div > div.src-shared-components-Header--rightSide--Xkise > a.src-shared-components-Header--link--yx1Hg.src-shared-components-Header--hideMdDown--GIrXY");
    await firstLink.click(); 
    await page.waitForTimeout(5000);
    const title2 = await page.title();
    expect(title2).toEqual('Бесплатные онлайн курсы, вебинары и гайды – обучение в Нетологии');
  },30000);

  test("Media page from header", async () => {
    await page.waitForTimeout(5000);
    const firstLink = await page.$("div.src-shared-components-Header--root--Bgeyw.src-shared-components-Header--color--Rzo8y.src-shared-components-Header--transparent--UmDdK > header > div > div.src-shared-components-Header--contentWrapper--Tbhhv > div > div.src-shared-components-Header--rightSide--Xkise > a:nth-child(2)");
    await firstLink.click(); 
    await page.waitForTimeout(5000);
    const title2 = await page.title();
    expect(title2).toEqual('Медиа Нетологии: об образовании в диджитале');
  },30000);
});
