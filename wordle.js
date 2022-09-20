const level = localStorage.getItem('level');
const pos = [1,1];
const word = localStorage.getItem('word')
const wordLength = word.length;
const guess = Array(wordLength), submit = Array(wordLength);

const load = () => {
    let i = 1;
    while(localStorage.getItem(level+ 'g'+ i + 1) !== null) {
        let newGuess = document.createElement("div");
        newGuess.id = "guess" + i;
        newGuess.className = "guess";
        document.getElementById('answer-board').appendChild(newGuess);
        for(let j = 1; j <= wordLength; j++){
            guess[j] = document.createElement("div");
            guess[j].id = 'g'+ i + j;
            guess[j].className = "guess-letter";
            guess[j].style.backgroundColor = localStorage.getItem(level + 'g' + i + j)
            guess[j].style.borderColor = localStorage.getItem(level + 'g' + i + j)
            guess[j].innerText = localStorage.getItem(level + 't' + i + j)
            newGuess.appendChild(guess[j]);
        }
        i++;
    }
    let newGuess = document.createElement("div");
    newGuess.id = "guess" + i;
    newGuess.className = "guess";
    document.getElementById('answer-board').appendChild(newGuess);
    for(let j = 1; j <= wordLength; j++){
        guess[j] = document.createElement("div");
        guess[j].id = 'g'+ i + j;
        guess[j].className = "guess-letter";
        newGuess.appendChild(guess[j]);
    }

    let letters = document.getElementsByClassName('letter');
    for (let i = 0; i < letters.length; i++) {
        let color = localStorage.getItem(level + letters[i].id);
        if (color !== null) letters[i].style.backgroundColor = color;
    }
    setTimeout(() => {
        document.getElementById('black-out').style.display = 'none';
    }, 1000);
}


const press = (e)=> {
    if (e.id === "ENTER") {
        if (pos[1] > wordLength){
            const used = Array(wordLength).fill(false);
            const color = Array(wordLength).fill("#3a3a3c");
            for (let i = 0; i < wordLength; i++) {
                if (word[i] === submit[i]) {
                    color[i] = "#538d4e";
                    used[i] = true;
                }
            }
            for (let i = 0; i < wordLength; i++) {
                for (let j = 0; j < wordLength; j++) {
                    if (submit[i] === word[j] && !used[j]) {
                        used[j] = true;
                        color[i] = "#b59f3b";
                    }
                }
            }

            for (let i = 0; i < wordLength; i++) {
                setTimeout(() => {
                    document.getElementById(('g' + pos[0]) + (i+1)).style.animation = "flip 0.5s";
                }, 300*i);
                setTimeout(() => {
                    document.getElementById(('g' + pos[0]) + (i+1)).style.backgroundColor = color[i];
                    document.getElementById(('g' + pos[0]) + (i+1)).style.borderColor = color[i];
                    localStorage.setItem((level + 'g' + pos[0]) + (i+1), color[i])
                }, 300*i + 150);
            }
            for (let i = 0; i < wordLength; i++) {
                document.getElementById(submit[i]).style.backgroundColor = color[i];
                localStorage.setItem(level + submit[i], color[i]);
            }
            if (color.every((c) => c === '#538d4e')) {
                if (localStorage.getItem('pass')){
                    localStorage.setItem('pass', localStorage.getItem('pass') + level);
                }
                else {
                    localStorage.setItem('pass', level);
                }
                
                for (let i = 0; i < wordLength; i++) {
                    setTimeout(() => {
                        document.getElementById(('g' + pos[0]) + (i+1)).style.animation = "bingo 0.5s ease-out";
                    }, 300*i + 1500);
                }
                
            }else {
                setTimeout(() => {
                    let newGuess = document.createElement("div");
                    newGuess.id = "guess" + (++pos[0]);
                    newGuess.className = "guess";
                    document.getElementById('answer-board').appendChild(newGuess);
                    for (let i = 0; i < wordLength; i++) {
                        guess[i] = document.createElement("div");
                        guess[i].id = ('g'+ pos[0]) + (i+1);
                        guess[i].className = "guess-letter";
                        newGuess.appendChild(guess[i]);
                    }
                    pos[1] = 1;
                }, 2000);
            }
        }
    }
    else if(e.id === "delete") {
        pos[1] = pos[1]>1? pos[1]-1 : 1;
        document.getElementById('g' + pos[0] + pos[1]).innerText = '';
        document.getElementById('g' + pos[0] + pos[1]).style.borderColor = "#3a3a3c"
    }
    else {
        document.getElementById('g' + pos[0] + pos[1]).innerText = e.id;
        localStorage.setItem(level + 't' + pos[0] + pos [1], e.id);
        document.getElementById('g' + pos[0] + pos[1]).style.animation = "magnify 0.15s"
        submit[pos[1]-1] = e.id; 
        document.getElementById('g' + pos[0] + pos[1]).style.borderColor = "#787c7e"
        if (pos[1] <= wordLength) pos[1]++;
    }
}

const goBack = (loc) => {
    document.getElementById('black-out').style.animation = 'darken 1s ease-out forwards';
    document.getElementById('black-out').style.display = 'block';
    setTimeout(() => {
        window.location = loc;
    }, 1000);
}