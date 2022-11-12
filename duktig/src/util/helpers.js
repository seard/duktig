const delay = ms => new Promise(res => setTimeout(res, ms));

function randInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    delay,
    randInt
};