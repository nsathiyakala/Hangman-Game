var wordInput = document.querySelector('.word-input');
var playbutton = document.querySelector('.game-over button');

var wrongGuess = 0;
var currentword;
var maxguess = 6;
var correctword = [];

playbutton.addEventListener("click", () => {
    wrongGuess = 0;
    correctword = [];
    gameWords();
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
    document.querySelector(".game-over").style.visibility = "hidden";
    updateLifesDisplay(); 
});

for (let i = 97; i < 123; i++) {
    var keyboard = document.querySelector(".keyboard");
    var button = document.createElement("button")
    button.type = "button"
    button.innerHTML = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => gameOn(e.target, String.fromCharCode(i)));
}

gameWords = () => {
    var { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentword = word;
    document.querySelector(".hint-text b").innerHTML = hint;
    wordInput.innerHTML = word.split("").map(() => `<li class="letter "></li>`).join("");
    updateLifesDisplay(); 
};

function updateLifesDisplay() {
    document.querySelector(".lifes b").innerHTML = `${wrongGuess}/${maxguess}`;
}

gameWords();

gameOn = (button, clickedword) => {
    if (currentword.includes(clickedword)) {
        [...currentword].forEach((letter, index) => {
            if (letter === clickedword) {
                correctword.push(letter);
               
                document.querySelectorAll("li")[index].innerHTML = clickedword;
                document.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuess++;
        console.log(wrongGuess + "increment");
        updateLifesDisplay();
        button.disabled = true;
        document.querySelector(".Hangman-img img").src = `images/hangman${wrongGuess}.png`;

    }
    if (maxguess === wrongGuess) {
        setTimeout(() => {
            document.querySelector(".game-over").style.visibility = "visible";
            document.querySelector(".game-over img ").src = `images/sad.gif`;
            document.querySelector(".game-over h2 ").innerHTML = "GAME OVER";
            document.querySelector(".game-over p ").innerHTML = `The correct Word : <b> ${
                currentword   
            }</b>`;
            // document.querySelector(".game-over p b").innerHTML = currentword;
        }, 300);
    }
    if (correctword.length === currentword.length) {
        setTimeout(() => {
            document.querySelector(".game-over").style.visibility = "visible";
            document.querySelector(".game-over img").src = `images/happy.gif`;
            document.querySelector(".game-over h2 ").innerHTML = `BINGO!`;
            document.querySelector(".game-over p ").innerHTML = `You Found The Word`;
        }, 300);
    }
};
