const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvxyz";
const MAX_SYL = 3;

const genBtnElem = document.querySelector("button#gen-btn");
const wordNumInputElem = document.querySelector("input#words-num-input");
const sylMinElem = document.querySelector("input#syl-min");
const sylMaxElem = document.querySelector("input#syl-max");
const wordListElem = document.querySelector("ul#word-list");

const print = (msg) => console.log(msg);
const prob = (prob) => Math.random() * 100 < prob ? true : false;

/**
 * @typedef {Object} Options
 * @property {number} [wordsLen=10]
 * @property {Object} sylRange
 * @property {number} sylRange.min
 * @property {number} sylRange.max
 */
let options = {
    wordsLen: 10,
    sylRange: {
        min: 2,
        max: 3,
    },
}

wordNumInputElem.value = options.wordsLen;
sylMinElem.value = options.sylRange.min;
sylMaxElem.value = options.sylRange.max;

/** @param {Array<String>} list */
function updateWordListElem(list) {
    wordListElem.innerHTML = "";

    list.forEach(word => {
        const li = document.createElement("li");
        const text = document.createTextNode(word);
        li.appendChild(text);
        wordListElem.appendChild(li);
    })
}

/**
 * @param {Options}
 * @returns {Array<String>}
 * */
function generateWordsList({wordsLen, sylRange}) {
    let list = [];

    for (let i = 0; i < wordsLen; i++) {
        let word = "";
        let sylLen = Math.floor(Math.random() * (sylRange.max - sylRange.min + 1)) + sylRange.min;

        for (let i = 0; i < sylLen; i++) {
            let vow = VOWELS[Math.floor(Math.random()*VOWELS.length)];
            let con = CONSONANTS[Math.floor(Math.random()*CONSONANTS.length)];

            let syl = con + vow;

            if (syl[0] === 'q' && syl[1] !== 'u') syl = syl[0] + 'u' + syl[1];

            if (prob(15)) {
                syl += 'm';
            } else if (prob(14)) {
                syl += 'n';
            } else if (prob(20)) {
                syl += 'r';
            } else if (prob(18)) {
                syl += 'l';
            } else if (prob(7)) {
                syl += 'x';
            }

            word += syl;
        }

        list.push(word);
    }

    return list;
}

genBtnElem.addEventListener("click", () => {
    let wordList = generateWordsList(options);
    updateWordListElem(wordList)
    wordList = [];
});

wordNumInputElem.addEventListener("input", event => {
    options.wordsLen = parseInt(event.target.value);
});

sylMinElem.addEventListener("input", event => {
    options.sylRange.min = parseInt(event.target.value);
});

sylMaxElem.addEventListener("input", event => {
    options.sylRange.max = parseInt(event.target.value);
});
