const request = require("request-promise");
const cheerio = require("cheerio");
const { Mpg123Controller } = require('./mpg123.controller');
const { LedController } = require('./led.controller');
const { TtsController } = require('./tts.controller');
const { delay } = require('../util/helpers');

let elPriceCrashed = false;

let dayPrice = null;
let currentPrice = null;
let lowestPrice = null;
let highestPrice = null;

let runningLoop;

const ElPriceController = {
    startElPriceReader(interval, speak = false) {
        this.stopElPriceReader();
        this.readElPrice(speak);

        this._startLoop(async () => {
            LedController.resetLEDs()
            LedController.flash(255, 0, 0, 500);
            await delay(2000);
            this.readElPrice();
        }, interval);
    },

    readElPrice(speak) {
        this._fetchData().then(async () => {
            LedController
                .resetLEDs()
                .setR(ElPriceController._getRValue())
                .setG(ElPriceController._getGValue());

            const dt = new Date();
            const h = dt.getHours();
            const m = dt.getMinutes();

            if (speak && (h > 8 && h < 23)) {
                await TtsController.speak(`The time is ${h}:${m} and the current electricity price is ${this._getCurrentPrice()} per kilowatt hour`);
            }
        });
    },

    stopElPriceReader() {
        clearInterval(runningLoop);
    },

    _startLoop(func, interval = 25) {
        clearInterval(runningLoop);
        runningLoop = setInterval(func, interval);
    },

    _getRValue() {
        const diff = highestPrice - lowestPrice;
        const ledMultiplier = 255 / highestPrice;
        const correctedPrice = currentPrice - lowestPrice;
        const RValue = Math.round(correctedPrice * ledMultiplier);
        return RValue;
    },

    _getGValue() {
        const diff = highestPrice - lowestPrice;
        const ledMultiplier = 255 / highestPrice;
        const correctedPrice = currentPrice - lowestPrice;
        const GValue = 255 - Math.round(correctedPrice * ledMultiplier);
        return GValue;
    },

    _getCurrentPrice() {
        return Math.round(currentPrice);
    },

    async _fetchData() {
        if (elPriceCrashed) {
            return;
        }
        
        try {
            await request('https://www.elbruk.se/timpriser-se3-stockholm', (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const infoBoxes = $(".info-box-number")
                    infoBoxes.each((i, data) => {
                        const test = $(data).text();
                        if (i === 0) {
                            dayPrice = Number($(data).text().split(',')[0]);
                        } else if (i === 1) {
                            currentPrice = Number($(data).text().split(',')[0]);
                        } else if (i === 2) {
                            lowestPrice = Number($(data).text().split(',')[0]);
                        } else if (i === 3) {
                            highestPrice = Number($(data).text().split(',')[0]);
                        }

                        // Break after first 4
                        return i < 3;
                    });

                    console.log(
                        ' | dayPrice ', dayPrice,
                        ' | currentPrice ', currentPrice,
                        ' | lowestPrice ', lowestPrice,
                        ' | highestPrice ', highestPrice
                    );
                } else {
                    console.log('Failed to request electricity price');
                }
            });
        } catch (e) {
            console.log('Crashed on request electricity price', e);
            elPriceCrashed = true;
        }
    }
}

module.exports = { ElPriceController };

