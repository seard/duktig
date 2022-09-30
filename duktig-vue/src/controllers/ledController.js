// var GPIO = require('pigpio').Gpio;
// const { exec } = require("child_process");

import { Gpio  } from 'pigpio';
import { exec } from 'child_process';

class LedController {
    constructor() {
        this.LEDs = {
            R: { GPIO: new Gpio(17, { mode: Gpio.OUTPUT }) },
            G: { GPIO: new Gpio(27, { mode: Gpio.OUTPUT }) },
            B: { GPIO: new Gpio(22, { mode: Gpio.OUTPUT }) },
        };

        this.setR(255);
        this.seG(25);
    }

    setR(val) {
        this.LEDs.R.GPIO.pwmWrite(val);
    }
    setG(val) {
        this.LEDs.G.GPIO.pwmWrite(val);
    }
    setB(val) {
        this.LEDs.B.GPIO.pwmWrite(val);
    }
    speak(text) {
        if (text) {
            exec(`./tts.sh ${text}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
    }
}

export default new LedController();
