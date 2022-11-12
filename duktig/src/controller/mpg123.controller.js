const { exec } = require("child_process");

var mpg = require('mpg123');
 
var player = new mpg.MpgPlayer();

const Mpg123Controller = {
    play(dir) {
        player.play(dir);
        console.log(player.bitrate);
    },
    stop() {
        player.stop();
    }
}

module.exports = { Mpg123Controller };
