// Imports
var child = require("child_process").spawn,
    PassThrough = require('stream').PassThrough,
    output = new PassThrough,
    error = new PassThrough;

// Configuration Options
var voice, pitch, speed, volume, addn_args;
var init = function (options) {
    options = options || {};
    voice = options.voice || 'en-us+f3';
    pitch = options.pitch || '5';
    speed = options.speed || '150';
    volume = options.volume || '10';
    addn_args = options.addn_args || [];
};

//Basic speak functionality
var say = function (text) {
    text = text
        ? [].concat(text)
        : [].concat("I was told to talk, but was not told what to say.");

    var ps = child('espeak', ['--stdout', '-v', voice, '-k', pitch, '-s', speed, '-a', volume].concat(addn_args).concat(text));

    ps.stdout.pipe(output);
    ps.stderr.pipe(error);
};

// Force defaults
init();

// Expose our endpoints
exports.init = init;
exports.say = say;
exports.audio = output;
exports.error = error;