const { ElementHandle } = require("puppeteer");
const { clickElement, getText, getNeededDatestamp, getRandomInt, touchForOccupied } = require("./lib/commands.js");

let page;
const randomLine = getRandomInt(10);
const randomSeat = getRandomInt(10);

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema tickets tests", () => {
  test("Claiming tickets with random day,first hall and first time", async () => {
    // берем рандомный день ( минимум завтра)
    const days = getRandomInt(6)+1;
    await clickElement(page, ".page-nav__day[data-time-stamp=\""+getNeededDatestamp(days)+"\"]");
    await clickElement(page,".movie-seances__list [data-seance-id=\"129\"]");
    // проверяем занято ли выбранное место
    let seatTaken =   await touchForOccupied(page,randomLine,randomSeat);
  while (seatTaken){
   // если место занято - генерируем новое место и повторяем
       randomLine = getRandomInt(10);
       randomSeat = getRandomInt(10);
       seatTaken =   await touchForOccupied(page,randomLine,randomSeat);
    };

    await clickElement(page, `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${randomLine}) > span:nth-child(${randomSeat})`);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "body > main > section > div > p:nth-child(2) > span");
   expect(actual).toContain(`${randomLine}/${randomSeat}`);

  });


  test("Trying to order ticket without choosing seats", async () => {
    // берем рандомный день ( минимум завтра)
    const days = getRandomInt(6)+1;
    await clickElement(page, ".page-nav__day[data-time-stamp=\""+getNeededDatestamp(days)+"\"]");
    await clickElement(page,".movie-seances__list [data-seance-id=\"139\"]");
    // нажимаем кнопку забронировать ( минимум завтра)
    await clickElement(page,".acceptin-button");
    //убеждаемся, что ничего не происходит
    const actual = await getText(page, "body > main > section > div.buying__info > div > p.buying__info-start");
    expect(actual).toContain(`Начало сеанса: 23:45`);
  
  });

  test("Claiming tickets with random day,first hall and second time", async () => {
    // берем рандомный день ( минимум завтра)
    const days = getRandomInt(6)+1;
    await clickElement(page, ".page-nav__day[data-time-stamp=\""+getNeededDatestamp(days)+"\"]");
    await clickElement(page,".movie-seances__list [data-seance-id=\"139\"]");
    // проверяем занято ли выбранное место
    let seatTaken =   await touchForOccupied(page,randomLine,randomSeat);
    while (seatTaken){
    // если место занято - генерируем новое место и повторяем
       randomLine = getRandomInt(10);
       randomSeat = getRandomInt(10);
       seatTaken =   await touchForOccupied(page,randomLine,randomSeat);
    };

    await clickElement(page, `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${randomLine}) > span:nth-child(${randomSeat})`);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "body > main > section > div > p:nth-child(2) > span");
    expect(actual).toContain(`${randomLine}/${randomSeat}`);

});

});
