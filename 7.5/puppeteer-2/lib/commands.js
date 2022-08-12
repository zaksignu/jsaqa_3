module.exports = {
    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Selector is not clickable: ${selector}`)
        }
    },

    getText: async function (page, selector) {
            await page.waitForSelector(selector)
            return await page.$eval(selector, (link) => link.textContent)
    },

    getRandomInt: function (maxValue) {
        return Math.floor(Math.random() * maxValue)
    },

    getNeededDatestamp: function (daysToApproach) {
        let currentTimestamp = new Date()
        zeroDayTimeStamp = currentTimestamp.setHours(0, 0, 0, 0) / 1000
        return zeroDayTimeStamp + 86400 * daysToApproach
    },

    touchForOccupied: async function (page, line, seat) {
        let mainSelector = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${line}) > span:nth-child(${seat})`
        let otherSelector = `span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken`
            await page.waitForSelector(mainSelector)
            //ищем ячейку по ее адресу и получаем актуальный селектор class = "....."
            let seatObject = await page.$(mainSelector)
            let actualSelector = await seatObject._remoteObject.description
            //если селекторы не совпадают - возвращаем false. это значит, что ячейка свободна
            if (actualSelector != otherSelector) {
                return false
            } else return true
    },
}
