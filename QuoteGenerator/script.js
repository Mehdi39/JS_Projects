const container = document.getElementById('container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// creating random number from 1-99
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// function for showing loader
function loading() {
    loader.hidden = false;
    container.hidden = true;
}

// function for showing container
function complete() {
    if (!loader.hidden) {
        container.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const randomQuote = data[getRandomInt(100)];
        // Placing Unknown author if Author is blank
        (randomQuote.author === '') ? authorText.innerText = 'Unknown' : authorText.innerText = randomQuote.author;

        // Reduce font size for long quotes
        (randomQuote.text.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

        quoteText.innerText = randomQuote.text;

        // hide the loader after data fetching.
        complete();
    } catch (error) {
        // getQuote()
        console.log(error.message)
    }
}

getQuote()

// functionality for "New Quote" btn
newQuoteBtn.addEventListener('click', getQuote)