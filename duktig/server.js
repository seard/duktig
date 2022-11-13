var express = require('express');
const request = require('request');
const localIpAddress = require("local-ip-address");
const { LedController } = require('./src/controller/led.controller');
const { TtsController } = require('./src/controller/tts.controller');
const { Mpg123Controller } = require('./src/controller/mpg123.controller');
const { ElPriceController } = require('./src/controller/el.price.controller');
const { delay, randInt } = require('./src/util/helpers');

var app = express();
app.use(express['static'](__dirname));
app.listen(3000);
console.log('App Server running at port 3000');

const readDelay = 3000;
const readCommandUrl = 'https://sebastianardesjo.com/duktig/read'
let lastTimeStamp = null;

// Raspberry Pi states
const DUKTIG = {
    LED: {
        SET: async (query) => {
            const { r, g, b, text } = query;
            LedController.resetLEDs()
                .setR(Number(r))
                .setG(Number(g))
                .setB(Number(b));
            await TtsController.speak(text);
        },
        PULSE: async (query) => {
            const { r, g, b, frequency, text } = query;
            LedController.resetLEDs()
                .pulse(Number(r), Number(g), Number(b), Number(frequency));
            await TtsController.speak(text);
        },
        FLASH: async (query) => {
            const { r, g, b, frequency, text } = query;
            LedController.resetLEDs()
                .flash(Number(r), Number(g), Number(b), Number(frequency));
            await TtsController.speak(text);
        },
    },
    ELECTRICITY: async () => {
        const query = {
            interval: 30 * 60 * 1000, // 30 minutes
            speak: true,
            highPrice: 150,
            lowPrice: 20,
            wakeHoursStart: 8,
            wakeHoursEnd: 22,
        };

        const { interval, speak, highPrice, lowPrice, wakeHoursStart, wakeHoursEnd } = query;

        ElPriceController.startElPriceReader(
            interval,
            highPrice,
            lowPrice,
            speak,
            wakeHoursStart,
            wakeHoursEnd
        );
    },
    SPEAK: async (query) => {
        const { text } = query;
        await TtsController.speak(text)
    },
    IMPORTANT: async () => {
        Mpg123Controller.play(`${__dirname}/audio/rickroll/rickroll_christmas.mp3`);
    },
};

const handleCommand = (json) => {
    if (!json.timestamp || json.timestamp === lastTimeStamp) {
        // Faulty command or same command as before
        return;
    }
    lastTimeStamp = json.timestamp;

    console.log(`NEW COMMAND: `, json);

    LedController.resetLEDs();
    Mpg123Controller.stop();
    ElPriceController.stopElPriceReader();

    switch (json.path) {
        // case '/duktig/led/stop': DUKTIG.LED.STOP(json.query); break;
        case '/duktig/led/stop': DUKTIG.ELECTRICITY(json.query); break;
        case '/duktig/led/set': DUKTIG.LED.SET(json.query); break;
        case '/duktig/led/pulse': DUKTIG.LED.PULSE(json.query); break;
        case '/duktig/led/flash': DUKTIG.LED.FLASH(json.query); break;
        case '/duktig/elprice': DUKTIG.ELECTRICITY(json.query); break;
        case '/duktig/speak': DUKTIG.SPEAK(json.query); break;
        case '/duktig/important': DUKTIG.IMPORTANT(json.query); break;
        default: break;
    }
};

(async function main() {
    // Alternate between our favorite theme colors
    LedController.alternate({ r: 255, g: 0, b: 155 }, { r: 0, g: 255, b: 170 }, 1000);

    const introductions = [
        `Hows it hanging my neighbors. I am running Duktig version 0.2.2`,
        `My IP is ${localIpAddress()}`
    ];

    await TtsController.speak(introductions.join(' '));
    await delay(10000);

    setInterval(() => {
        request(readCommandUrl, { json: true }, (err, res, body) => {
            if (err) return console.log(err);
            handleCommand(body);
        });
    }, readDelay);
    
    /*
    ElPriceController._fetchData().then(async () => {
        LedController
            .resetLEDs()
            .setR(ElPriceController._getRValue())
            .setG(ElPriceController._getGValue());
        await TtsController.speak(`The current electricity price is ${ElPriceController._getCurrentPrice()} per kilowatt hour`);
    });
    */
    
    //Mpg123Controller.play(`${__dirname}/audio/rickroll/rickroll_christmas.mp3`);
})();




