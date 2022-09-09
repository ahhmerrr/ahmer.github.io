import { runCommand } from "../chilishell/src/terminal.js";

// ? preventDefault utility function
const preventDefault = (e) => e.preventDefault();

// ? message (without period)
const message = "i like to make stuff";

// ? promise that resolves after a determined amount of time
const wait = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

// ? promise that resolves after a random amount of time, between min and max
const waitRandom = (min = 200, max = 500) => wait(min, max);

// ? get a random number between min (inclusive) and max (exclusive)
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// ? run as soon as window loads
$(window).on("load", run());

function run() {
    // ? add event listeners and display text
    addListeners();
    displayText();

    console.log(
        "%c hello there, beautiful!",
        "color: crimson; font-weight: bold;"
    );
}

// ? add event listeners to scroll buttons
function addListeners() {
    // ? first scroll down button
    $("#scrollDown1").on("click", (e) => {
        document.documentElement.scrollTo({
            top: document.body.scrollHeight / 4,
            behavior: "smooth",
        });
    });

    // ? second scroll down button
    $("#scrollDown2").on("click", (e) => {
        document.documentElement.scrollTo({
            top: document.body.scrollHeight / 2,
            behavior: "smooth",
        });
    });

    // ? third scroll down button
    $("#scrollDown3").on("click", (e) => {
        document.documentElement.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });

    // ? last button (scroll up button)
    $("#scrollUp").on("click", (e) => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // ? terminal input keypress
    $("#terminalInputText").on("keypress", (e) => {
        if (e.key === "Enter") runCommand();
    });
}

// ? display typed text
async function displayText() {
    // ? 1 second wait at the beginning, for effect
    await wait(1000);

    // ? iterate over message; yes, i use for loops. fight me >:(
    for (let i = 0; i < message.length; i++) {
        // ? 1 in 4 chance of mistyped character
        if (Math.random() < 0.25) {
            // ? random error character from characters that have not been typed yet
            $("#delayText").append(message[rand(i, message.length)]);

            // ? if the message has been displayed at random, break
            if ($("#delayText").html() === message) break;

            // ? wait for a random time before backspacing
            await waitRandom();

            // ? backspace
            $("#delayText").html($("#delayText").html().substring(0, i));

            // ? wait for a random time, for effect
            await waitRandom();
            i--;
        } else {
            // ? type correct character
            $("#delayText").append(message[i]);

            // ? wait for a random time
            await waitRandom();
        }
    }

    // ? wait a bit more, just for effect
    await waitRandom(500, 1000);

    // ? proper grammar is always appreciated
    $("#delayText").append(".");
}
