# node-espeak-pipe
Simple eSpeak interface using a node child process and PassThrough streams to pipe stdout and stderr.

## Installation
    npm install espeak-pipe

## Usage
Minimal usage is to require the library, define the audio pipe, and tell it to say something! The example below uses node-speaker to output the audio data from eSpeak

    var Speaker = require('speaker'),
        espeak = require('espeak-pipe');
    // Values below pertain to my test system
    var ttsSpeaker = new Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 22050,
        signed: true
    });
    espeak.audio.pipe(ttsSpeaker);
    espeak.say("Speaker Initialized, sir.");

## Configuration
You can also specify any option for the eSpeak application you want with a call to init. Basics can be seen below:

    var espeak = require('espeak-pipe');
    espeak.init({
        "voice": "en-us+f3",
        "pitch": "5",
        "speed": "150",
        "volume": "10",
        "addn_args": []
    });

## License
Please see the LICENSE file included with this repository for full details.

The MIT License (MIT)

Copyright (c) 2015 Winston R. Milling
