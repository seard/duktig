# TODO
- Push IP to middleman
- Add secret REBOOT API-call on website
- Add outlet in the box so that the speaker doesn't run on electricity from the pi
  - Get rid of AUX static? Maybe disable voltage on USB slot until playing sound
- Play Youtube sounds?
- Record voice commands in phone and send buffer?
#

1: Setup [duktig-middleman](https://github.com/seard/duktig-middleman)

2: Clone this project to `/home/seard/Desktop/gitdev/` :warning: IMPORTANT THAT THE DIRECTORY IS CORRECT 

3: In `server.js`, set the `readCommandUrl` to the read-API on the server running the middleman:
```javascript
const readCommandUrl = 'https://sebastianardesjo.com/duktig/read'
```

4: run `./home/seard/Desktop/gitdev/duktig/update.sh`

5: Reboot (?)
