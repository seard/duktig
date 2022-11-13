# TODO
- Push IP to middleman
- Add outlet in the box so that the speaker doesn't run on electricity from the pi
  - Get rid of AUX static? Maybe disable voltage on USB slot until playing sound
- Read out the version on startup
- Play Youtube sounds?
- Record voice commands in phone and send buffer?
#

1: Setup [duktig-middleman](https://github.com/seard/duktig-middleman)

2: Place project in /home/seard/Desktop/duktig-proj (:warning: important)

3: In `server.js`, set the `readCommandUrl` to the read-API on the server running the middleman:
```javascript
const readCommandUrl = 'https://sebastianardesjo.com/duktig/read'
```

4: Run `update.sh`, then reboot the device
