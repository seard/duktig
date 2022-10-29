const request = require("request-promise");
const cheerio = require("cheerio");

let elPriceCrashed = false;

let dayPrice = null;
let currentPrice = null;
let lowestPrice = null;
let highestPrice = null;

const ElPriceController = {
    getRValue() {
        const diff = highestPrice - lowestPrice;
        const ledMultiplier = 255 / highestPrice;
        const correctedPrice = currentPrice - lowestPrice;
        const RValue = Math.round(correctedPrice * ledMultiplier);
        return RValue;
    },

    getGValue() {
        const diff = highestPrice - lowestPrice;
        console.log('diff', diff);
        const ledMultiplier = 255 / highestPrice;
        console.log('ledMultiplier', ledMultiplier);
        const correctedPrice = currentPrice - lowestPrice;
        console.log('correctedPrice', correctedPrice);
        const GValue = 255 - Math.round(correctedPrice * ledMultiplier);
        console.log('GValue', GValue);
        return GValue;
    },

    getCurrentPrice() {
        return Math.round(currentPrice);
    },

    async fetchData() {
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

