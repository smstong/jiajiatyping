let screenE = null;
let scoreE = null;
let keyAsked = "";
let playingSound = false;

function playSoundUntilDone(filename, cb) {
    const audio = new Audio(filename);
    audio.play();
    playingSound = true;
    audio.onended = function () {
        cb();
        playingSound = false;
    };
}
window.addEventListener('DOMContentLoaded', (e) => {
    scoreE = document.getElementById("score");
    screenE = document.getElementById("screen");
    _init();
});

function _init() {
    nextQuestion();
    let countTyped = 0;
    let countBad = 0;
    window.addEventListener("keydown", (e) => {
        if(playingSound == true){
            return;
        }
        if (["Shift", "Ctrol",].indexOf(e.key) >= 0) {
            return;
        }

        countTyped++;
        const classList = screenE.classList;
        if (e.key == keyAsked) {
            classList.remove("bad-answer");
            classList.add("good-answer");
            playSoundUntilDone("good.wav", () => {
                nextQuestion();
                scoreE.innerText = `${countTyped - countBad}/${countTyped}`;
            });

        } else {
            countBad++;
            classList.remove("good-answer");
            classList.add("bad-answer");
            playSoundUntilDone("bad.wav", () => {
                scoreE.innerText = `${countTyped - countBad}/${countTyped}`;
            });
        }
    });
}

function nextQuestion() {
    keyAsked = getRandChar();
    screenE.innerText = `${keyAsked}`;
    screenE.classList.remove("bad-answer", "good-answer");
}

function getRandChar() {
    const chars = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z", "a", "b",
        "c", "d", "e", "f", "g", "h", "i",
        "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w",
        "x", "y", "z", "0", "1", "2", "3",
        "4", "5", "6", "7", "8", "9", "+",
        "-", "*", "/", ",", "'", '"', ";",
        ":", "?",];
    const i = Math.floor(chars.length * Math.random());
    return chars[i];
}