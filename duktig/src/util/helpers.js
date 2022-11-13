const delay = ms => new Promise(res => setTimeout(res, ms));
const randInt = (max) => Math.floor(Math.random() * max);
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const isValidHour = (h) => h > 0 && h < 24;
const padTo2Digits = (num) => String(num).padStart(2, '0');

module.exports = {
    delay,
    randInt,
    clamp,
    padTo2Digits,
    isValidHour
};