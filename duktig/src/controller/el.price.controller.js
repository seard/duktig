const request = require("request-promise");
const cheerio = require("cheerio");
const { Mpg123Controller } = require('./mpg123.controller');
const { LedController } = require('./led.controller');
const { TtsController } = require('./tts.controller');
const { delay, isValidHour, padTo2Digits, clamp } = require('../util/helpers');

let elPriceCrashed = false;

let dayPrice = null;
let currentPrice = null;
let lowestPrice = null;
let highestPrice = null;

let runningLoop;

const ElPriceController = {
    startElPriceReader(interval, highPrice, lowPrice, speak = false, wakeHoursStart = 8, wakeHoursEnd = 21) {
        if (wakeHoursStart > wakeHoursEnd || !isValidHour(wakeHoursStart) || !isValidHour(wakeHoursEnd)) {
            // Go to default wakeHours
            wakeHoursStart = 9;
            wakeHoursEnd = 21;
        }

        const h = new Date().getHours();

        this.speak = speak && h > wakeHoursStart && h < wakeHoursEnd;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;

        this.stopElPriceReader();
        this.readElPrice();

        this._startLoop(async () => {
            LedController.resetLEDs()
            // Flash red for minimum of 2 seconds to show client we're loading the price
            LedController.flash(255, 0, 0, 500);
            await delay(2000);
            this.readElPrice();
        }, interval);
    },

    readElPrice() {
        this._fetchData().then(async () => {
            LedController
                .resetLEDs()
                .setR(ElPriceController._getRValue())
                .setG(ElPriceController._getGValue());

            const dt = new Date();
            const h = padTo2Digits(dt.getHours());
            const m = padTo2Digits(dt.getMinutes());

            if (this.speak) {
                await TtsController.speak(`The time is ${h}:${m} and the current electricity price is ${this._getCurrentPrice()} per kilowatt hour`);
            }
        });
    },

    stopElPriceReader() {
        clearInterval(runningLoop);
    },

    _startLoop(func, interval) {
        clearInterval(runningLoop);
        runningLoop = setInterval(func, interval);
    },

    _getRValue() {
        const tHighPrice = this.highPrice || highestPrice;
        const tLowPrice = this.lowPrice || lowestPrice;

        const diff = tHighPrice - tLowPrice;
        if (diff < 1) {
            // Avoid division by 0
            diff = 1;
        }
        const ledMultiplier = 255 / diff;
        const correctedPrice = currentPrice - tLowPrice;
        const RValue = Math.round(correctedPrice * ledMultiplier);
        return RValue;
    },

    _getGValue() {
        const tHighPrice = this.highPrice || highestPrice;
        const tLowPrice = this.lowPrice || lowestPrice;

        const diff = tHighPrice - tLowPrice;
        if (diff < 1) {
            // Avoid division by 0
            diff = 1;
        }
        const ledMultiplier = 255 / diff;
        const correctedPrice = currentPrice - tLowPrice;
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

