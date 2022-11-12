var GPIO = require('pigpio').Gpio;
const { exec } = require("child_process");
const { delay } = require('../util/helpers');

const LEDs = {
    R: { GPIO: new GPIO(17, { mode: GPIO.OUTPUT }) },
    G: { GPIO: new GPIO(27, { mode: GPIO.OUTPUT }) },
    B: { GPIO: new GPIO(22, { mode: GPIO.OUTPUT }) },
};

let runningLoop;

const LedController = {
    startLoop(func, interval = 25) {
        this.resetLEDs();
        clearInterval(runningLoop);
        runningLoop = setInterval(func, interval);
    },

    resetLEDs() {
        clearInterval(runningLoop);
        this.setR(0).setG(0).setB(0);
        return this;
    },

    setR(val) {
        LEDs.R.GPIO.pwmWrite(val);
        return this;
    },

    setG(val) {
        LEDs.G.GPIO.pwmWrite(val);
        return this;
    },

    setB(val) {
        LEDs.B.GPIO.pwmWrite(val);
        return this;
    },

    pulse(r = false, g = false, b = false, frequency = 1) {
        console.log(`PULSE r=${r} | g=${g} | b=${b} | frequency=${frequency}`);
        this.startLoop(loop);
        function loop() {
            if (r > 0) {
                let brightnessR = (Math.sin((Date.now()/300 * frequency) + 0.00) * 0.5) + 0.5;
                brightnessR = Math.floor(brightnessR * r);
                LedController.setR(brightnessR);
            }
            if (g > 0) {
                let brightnessG = (Math.sin((Date.now()/500 * frequency) + 0.33) * 0.5) + 0.5;
                brightnessG = Math.floor(brightnessG * g);
                LedController.setG(brightnessG);
            }
            if (b > 0) {
                let brightnessB = (Math.sin((Date.now()/700 * frequency) + 0.66) * 0.5) + 0.5;
                brightnessB = Math.floor(brightnessB * b);
                LedController.setB(brightnessB);
            }
        }
    },
    
    flash(r = false, g = false, b = false, frequency = 400) {
        console.log(`FLASH r=${r} | g=${g} | b=${b} | frequency=${frequency}`);
        this.startLoop(loop, frequency);
        let toggle = false;
        function loop() {
            toggle = !toggle;
            LedController.setR(r * (+toggle)).setG(g * (+toggle)).setB(b * (+toggle));
        }
    },

    alternate(rgb1, rgb2, frequency = 400) {
        console.log(`ALTERNATE rgb1=${rgb1} | rgb2=${rgb2} | frequency=${frequency}`);
        this.startLoop(loop, frequency);
        const halfFrequency = Math.round(frequency * 0.5);
        async function loop() {
            LedController.setR(rgb1.r).setG(rgb1.g).setB(rgb1.b);
            await delay(halfFrequency);
            LedController.setR(rgb2.r).setG(rgb2.g).setB(rgb2.b);
            await delay(halfFrequency);
        }
    }
}

module.exports = { LedController };