const { exec } = require("child_process");

var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();

const Mpg123Controller = {
    play(dir) {
        player.play(dir);
        console.log(player.bitrate);
        /*
        if (dir) {
            exec(`mpg123 ${dir}`, (error, stdout, stderr) => {
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
        */
    }
}

module.exports = { Mpg123Controller };

