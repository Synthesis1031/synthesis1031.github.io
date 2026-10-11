// Card 3 form: SYNTHESIS button -> spinner for 5 seconds -> "30 MINUTES".
const LOADING_MS = 5000;

const form = document.getElementById("entry-form");
const button = form.querySelector(".synthesis-btn");
const spinner = form.querySelector(".spinner");
const timer = form.querySelector(".timer");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  button.hidden = true;
  spinner.hidden = false;

  setTimeout(() => {
    spinner.hidden = true;
    timer.hidden = false;
  }, LOADING_MS);
});

// Card 2: shrink or grow the first quote's text so the box never needs a scrollbar.
const MIN_FONT_PX = 8;
const MAX_FONT_PX = 28;

const quotesBox = document.querySelector(".quotes");
const fitText = quotesBox.querySelector("blockquote:first-child p");
const featureImage = document.querySelector(".feature-image img");

function fitQuotes() {
  let low = MIN_FONT_PX;
  let high = MAX_FONT_PX;

  while (high - low > 0.25) {
    const mid = (low + high) / 2;
    fitText.style.fontSize = `${mid}px`;
    if (quotesBox.scrollHeight > quotesBox.clientHeight) {
      high = mid;
    } else {
      low = mid;
    }
  }

  fitText.style.fontSize = `${low}px`;
}

window.addEventListener("resize", fitQuotes);
featureImage.addEventListener("load", fitQuotes);
document.fonts.ready.then(fitQuotes);
fitQuotes();

// Background music: loops forever. Browsers block sound until the visitor
// interacts with the page, so if autoplay is refused, start on the first click/tap/key.
const music = document.getElementById("bg-music");
const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchend"];

function startMusic() {
  music.play().then(() => {
    UNLOCK_EVENTS.forEach((type) => document.removeEventListener(type, startMusic));
  }).catch(() => {});
}

UNLOCK_EVENTS.forEach((type) => document.addEventListener(type, startMusic));
startMusic();
