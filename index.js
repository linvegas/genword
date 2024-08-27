const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvxyz";
const MAX_WORDS = 10;
const MAX_SYL = 3;

const genBtnElem = document.querySelector("button#gen-btn");
const wordListElem = document.querySelector("ul#word-list");

const print = (msg) => console.log(msg);

const prob = (prob) => Math.random() * 100 < prob ? true : false;

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

/** @returns {Array<String>} */
function generateWordsList() {
    let list = [];

    for (let i = 0; i < MAX_WORDS; i++) {
        let word = "";

        for (let i = 0; i < (Math.floor(Math.random()*MAX_SYL) + 2); i++) {
            let vow = VOWELS[Math.floor(Math.random()*VOWELS.length)];
            let con = CONSONANTS[Math.floor(Math.random()*CONSONANTS.length)];

            let syl = con + vow;

            if (syl[0] === 'q' && syl[1] !== 'u') syl = syl[0] + 'u' + syl[1];

            if (prob(15)) {
                syl += 'm';
            } else if (prob(14)) {
                syl += 'n';
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
    // event.preventDefault();
    let wordList = generateWordsList();
    updateWordListElem(wordList)
    wordList = [];
});


