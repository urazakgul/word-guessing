const inputs = document.querySelector(".inputs");
const definition = document.querySelector(".definition span");
const level = document.querySelector(".level span");
const wordType = document.querySelector(".word-type span");
const wrongLetter = document.querySelector(".wrong-letter span");
const guessLeft = document.querySelector(".guess-left span");
const userInput = document.querySelector(".user-input");
const score = document.querySelector(".score");
const info = document.querySelector(".info span");
const levelA1 = document.querySelector(".level-a1 span");
const levelA2 = document.querySelector(".level-a2 span");
const levelB1 = document.querySelector(".level-b1 span");
const levelB2 = document.querySelector(".level-b2 span");
const levelC1 = document.querySelector(".level-c1 span");

let word, maxGuesses, correctWord = [], incorrectWord = [];
let currentScore = 0, totalA1 = 0, totalA2 = 0, totalB1 = 0, totalB2 = 0, totalC1 = 0, a1Score = 0, a2Score = 0, b1Score = 0, b2Score = 0, c1Score = 0;

const randomWord = () => {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 5; correctWord = []; incorrectWord = [];

    const originalDefinition = ranObj.definition.trim();
    const modifiedDefinition = originalDefinition.charAt(0).toUpperCase() + originalDefinition.slice(1);
    definition.innerText = modifiedDefinition;
    level.innerText = ranObj.level.toUpperCase();
    const originalWordType = ranObj.type;
    const modifiedWordType = originalWordType.charAt(0).toUpperCase() + originalWordType.slice(1);
    wordType.innerText = modifiedWordType;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectWord;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomWord();

const initGame = (e) => {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrectWord.includes(` ${key}`) && !correctWord.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    correctWord.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                    currentScore += 1;
                    score.innerText = "Your score is " + currentScore;
                }
            }
        } else {
            maxGuesses--;
            incorrectWord.push(` ${key}`);
            currentScore -= 1;
            score.innerText = "Your score is " + currentScore;
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectWord;
    }
    userInput.value = "";

    setTimeout(() => {
        if (correctWord.length === word.length) {
            switch (level.innerText.toUpperCase()) {
                case "A1":
                    a1Score++;
                    totalA1++;
                    levelA1.innerText = `${a1Score}/${totalA1}`;
                    break;
                case "A2":
                    a2Score++;
                    totalA2++;
                    levelA2.innerText = `${a2Score}/${totalA2}`;
                    break;
                case "B1":
                    b1Score++;
                    totalB1++;
                    levelB1.innerText = `${b1Score}/${totalB1}`;
                    break;
                case "B2":
                    b2Score++;
                    totalB2++;
                    levelB2.innerText = `${b2Score}/${totalB2}`;
                    break;
                case "C1":
                    c1Score++;
                    totalC1++;
                    levelC1.innerText = `${c1Score}/${totalC1}`;
                    break;
            }
            info.innerText = `Congrats! You found the word ${word.toUpperCase()}. The new word is coming...`;
            setTimeout(() => {
                randomWord();
                info.innerText = "No information available yet";
            }, 3000);
        } else if (maxGuesses < 1) {
            switch (level.innerText.toUpperCase()) {
                case "A1":
                    totalA1++;
                    levelA1.innerText = `${a1Score}/${totalA1}`;
                    break;
                case "A2":
                    totalA2++;
                    levelA2.innerText = `${a2Score}/${totalA2}`;
                    break;
                case "B1":
                    totalB1++;
                    levelB1.innerText = `${b1Score}/${totalB1}`;
                    break;
                case "B2":
                    totalB2++;
                    levelB2.innerText = `${b2Score}/${totalB2}`;
                    break;
                case "C1":
                    totalC1++;
                    levelC1.innerText = `${c1Score}/${totalC1}`;
                    break;
            }
            info.innerText = "You used up your maximum tries. The new word is coming...";
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            setTimeout(() => {
                randomWord();
                info.innerText = "No information available yet";
            }, 3000);
        }
    });

}

userInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => userInput.focus());
document.addEventListener("keydown", () => userInput.focus());