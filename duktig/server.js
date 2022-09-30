var express = require('express');
const localIpAddress = require("local-ip-address")
const { LedController } = require('./src/controller/led.controller');
const { TtsController } = require('./src/controller/tts.controller');

var app = express();

app.use(express['static'](__dirname));

app.get('/ip', function (req, res) {
    const ip = localIpAddress();
    console.log('/ip = ', ip);
    res.status(200).send(ip);
});

app.get('/led/pulse', function (req, res) {
    try {
        const { r, g, b, speed, text } = req.query;
        LedController.pulse(r, g, b, Number(speed));
        TtsController.speak(text);
        res.status(200).send(`Pulsing...`);
    } catch (e) {
        console.log(e);
    }
});

app.get('/led', function (req, res) {
    const { r, g, b } = req.query;
    LedController.setR(r).setG(g).setB(b);
    res.status(200).send(`R=${r} | G=${g} | B=${b}`);
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