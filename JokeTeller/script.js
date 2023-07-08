const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

const apiURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to voiceRSS api
function tellMe(joke) {
    console.log('tell me: ', joke);
    VoiceRSS.speech({
        key: '9ed028f353744f98be606ad16cfc394f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from JOKEAPI

async function getJokes() {
    let joke = '';
    try {
        const callingJokes = await fetch(apiURL);
        const responses = await callingJokes.json();
        // console.log("setup: " + responses.setup + "\n" + "delivery: " + responses.delivery);
        if (responses.setup) {
            joke = `${responses.setup} ... ${responses.delivery}`
        } else {
            joke = responses.joke;
        }
        // text-to-speech
        tellMe(joke);
        //disable button
        toggleButton();
    } catch (error) {
        console.log(error.message)
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton);