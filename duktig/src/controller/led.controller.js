var GPIO = require('pigpio').Gpio;
const { exec } = require("child_process");

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
        this.setR(0).setG(0).setB(0);
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

    pulse(r = false, g = false, b = false, speed = 1) {
        console.log('r', r);
        console.log('g', g);
        console.log('b', b);
        console.log('speed', speed);
        this.startLoop(loop);
        function loop() {
            if (r === "1") {
                let brightnessR = (Math.sin((Date.now()/300 * speed) + 0.00) * 0.5) + 0.5;
                brightnessR = Math.floor(brightnessR * 255);
                LedController.setR(brightnessR);
            }
            if (g === "1") {
                let brightnessG = (Math.sin((Date.now()/500 * speed) + 0.33) * 0.5) + 0.5;
                brightnessG = Math.floor(brightnessG*255);
                LedController.setG(brightnessG);
            }
            if (b === "1") {
                let brightnessB = (Math.sin((Date.now()/700 * speed) + 0.66) * 0.5) + 0.5;
                brightnessB = Math.floor(brightnessB*255);
                LedController.setB(brightnessB);
            }
        }
    }
}

module.exports = { LedController };