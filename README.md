# TODO
-Place IP above main text
-Add new logotype D as background and favicon
-Print QR code to website
-Color the box
-Fit the speakers inside(?) Perform tests to see if it works...
-Start = red light -> start server.js = flash yellow -> internet connection (ping?) -> flash green for a short while, then stop
-Get rid of AUX static? Maybe disable voltage on USB slot until playing sound
-Play Youtube sounds?
-Record voice commands in phone?
#

1: Setup [duktig-middleman](https://github.com/seard/duktig-middleman)
2: In `server.js`, set the `readCommandUrl` to the read-API on the server running the middleman:
```javascript
const readCommandUrl = 'https://sebastianardesjo.com/duktig/read'
```
3: Run `update.sh`, then reboot the device
