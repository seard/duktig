var express = require('express');
const localIpAddress = require("local-ip-address");
const { LedController } = require('./src/controller/led.controller');
const { TtsController } = require('./src/controller/tts.controller');
const { Mpg123Controller } = require('./src/controller/mpg123.controller');
const { ElPriceController } = require('./src/controller/el.price.controller');

var app = express();

app.use(express['static'](__dirname));

app.get('/ip', function (req, res) {
    const ip = localIpAddress();
    console.log('/ip = ', ip);
    res.status(200).send(ip);
});

app.get('/important', function (req, res) {
    const dir = `${__dirname}/audio/rickroll/rickroll_christmas.mp3`;
    Mpg123Controller.play(dir);
    console.log('Rickrolling...');
    res.status(200).send('Rickrolling...');
});

app.get('/led', function (req, res) {
    const { r, g, b } = req.query;
    LedController.resetLEDs();
    LedController.setR(Number(r)).setG(Number(g)).setB(Number(b));
    res.status(200).send(`R=${r} | G=${g} | B=${b}`);
});

app.get('/led/stop', function (req, res) {
    try {
        LedController.resetLEDs();
        res.status(200).send(`Stopping...`);
    } catch (e) {
        console.log(e);
    }
});

app.get('/led/set', function (req, res) {
    try {
        const { r, g, b, text } = req.query;
        LedController.resetLEDs();
        LedController.setR(Number(r)).setG(Number(g)).setB(Number(b));
        TtsController.speak(text);
        res.status(200).send(`Setting...`);
    } catch (e) {
        console.log(e);
    }
});

app.get('/led/pulse', function (req, res) {
    try {
        const { r, g, b, frequency, text } = req.query;
        LedController.resetLEDs();
        LedController.pulse(Number(r), Number(g), Number(b), Number(frequency));
        TtsController.speak(text);
        res.status(200).send(`Pulsing...`);
    } catch (e) {
        console.log(e);
    }
});

app.get('/led/flash', function (req, res) {
    try {
        const { r, g, b, frequency, text } = req.query;
        LedController.resetLEDs();
        LedController.flash(Number(r), Number(g), Number(b), Number(frequency));
        TtsController.speak(text);
        res.status(200).send(`Flashing...`);
    } catch (e) {
        console.log(e);
    }
});

app.get('/speak', function (req, res) {
    const { text } = req.query;
    TtsController.speak(text);
    res.status(200).send();
});

// Express route to handle errors
app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

app.listen(3000);
console.log('App Server running at port 3000');

LedController.flash(25, 0, 0, 500);

ElPriceController.fetchData().then(() => {
    LedController
        .resetLEDs()
        .setR(ElPriceController.getRValue())
        .setG(ElPriceController.getGValue());
    TtsController.speak(`The current electricity price is ${ElPriceController.getCurrentPrice()} per kilowatt hour`);
});

//Mpg123Controller.play(`${__dirname}/audio/rickroll/rickroll_christmas.mp3`);


