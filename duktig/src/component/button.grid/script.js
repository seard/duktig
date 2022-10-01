const BASE_URL = "https://sardesjo-0ilp6k0xbyhf300j.socketxp.com";

function HTML_BUTTON(text, callback, params) {
    return `<div onClick="${callback}(${params})" class="emotion">
        <p>
            ${text}
        </p>
    </div>`
};

$.ajax({
    type: 'GET',
    url: `${BASE_URL}/ip`,
    contentType: 'application/json; charset=utf-8',
    success: function(data) {
        const IP_HEADER = document.getElementById("ip-header");
        IP_HEADER.innerHTML = data;
        console.log(data);
    }
});

function pulse() {
    const r = document.getElementById("cRed").value;
    const g = document.getElementById("cGreen").value;
    const b = document.getElementById("cBlue").value;
    const frequency = document.getElementById("pulseFrequency").value / 10.0;
    const text = document.getElementById("tts-text").value;

    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/led/pulse`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: { r, g, b, frequency, text },
        success: function(data) {
            console.log('Pulsing...');
        }
    });
}

function flash() {
    const r = document.getElementById("cRed").value;
    const g = document.getElementById("cGreen").value;
    const b = document.getElementById("cBlue").value;
    const frequency = document.getElementById("flashFrequency").value * 100;
    const text = document.getElementById("tts-text").value;

    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/led/flash`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: { r, g, b, frequency, text },
        success: function(data) {
            console.log('Flashing...');
        }
    });
}

// No longer works because you removed the id from the element, replaced with class
const BUTTON_WRAPPER = document.getElementById("button-wrapper");
/*
BUTTON_WRAPPER.innerHTML +=
    HTML_BUTTON('Pulse', pulse.name, 'true, false, false, 0.5') +
    HTML_BUTTON('G', pulse.name, 'false, true, false, 0.5') +
    HTML_BUTTON('B', pulse.name, 'false, false, true, 0.5') +
    HTML_BUTTON('RG', pulse.name, 'true, true, false, 0.5') +
    HTML_BUTTON('RB', pulse.name, 'true, false, true, 0.5') +
    HTML_BUTTON('GB', pulse.name, 'false, true, true, 0.5') +
    HTML_BUTTON('RGB', pulse.name, 'true, true, true, 0.5');
*/
