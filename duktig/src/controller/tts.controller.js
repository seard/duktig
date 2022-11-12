const { exec } = require("child_process");

const TtsController = {
    async speak(text) {
        if (text) {
            await exec(`./tts.sh ${text}`, (error, stdout, stderr) => {
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

module.exports = { TtsController };

