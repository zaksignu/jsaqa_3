const puppeteer = require('puppeteer')
const chai = require('chai')
const expect = chai.expect
const { Given, When, Then, Before, After } = require('cucumber')
const {
    clickElement,
    getText,
    getNeededDatestamp,
    getRandomInt,
    touchForOccupied,
} = require('../../lib/commands.js')

const randomLine = getRandomInt(10)
const randomSeat = getRandomInt(10)

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 })
    const page = await browser.newPage()
    this.browser = browser
    this.page = page
})

After(async function () {
    if (this.browser) {
        await this.browser.close()
    }
})

Given('user is on {string} page', async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru/client/${string}`, {
        setTimeout: 20000,
    })
})

When('user choose random date of film', async function () {
    const days = getRandomInt(6) + 1
    let selector =
        '.page-nav__day[data-time-stamp="' + getNeededDatestamp(days) + '"]'
    await this.page.waitForSelector(selector)
    return await clickElement(this.page, selector)
})

When('user choose 1900 film "Logan"', async function () {
    return await clickElement(
        this.page,
        '.movie-seances__list [data-seance-id="129"]'
    )
})

When('user choose random seat', async function () {
    let seatTaken = await touchForOccupied(this.page, randomLine, randomSeat)
    while (seatTaken) {
        randomLine = getRandomInt(10)
        randomSeat = getRandomInt(10)
        seatTaken = await touchForOccupied(this.page, randomLine, randomSeat)
    }
    await clickElement(
        this.page,
        `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${randomLine}) > span:nth-child(${randomSeat})`
    )
    return await clickElement(this.page, '.acceptin-button')
})

Then('user sees boooking confirmation', async function () {
    let selector = 'body > main > section > div > p:nth-child(2) > span'
    await this.page.waitForSelector(selector)
    const actual = await getText(this.page, selector)
    expect(actual).contain(`${randomLine}/${randomSeat}`)
})
