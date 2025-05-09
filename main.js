const x = 'X';
const o = 'O';

const yourScore = document.getElementById('yourScore');
const gameScore = document.getElementById('gameScore');

const winOutput = document.getElementById('winOutput');

// Buttons
const play = document.getElementById('play');
document.getElementById('clearScores').addEventListener('click',
    () => {
        localStorage.clear();
        location.reload();
    });

let miniRandom = Math.round(Math.floor(Math.random() * 2) + 1);

let game;
let user;

// Boxes
let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let box5 = document.getElementById('box5');
let box6 = document.getElementById('box6');
let box7 = document.getElementById('box7');
let box8 = document.getElementById('box8');
let box9 = document.getElementById('box9');

let win = false;

// Local storage
if (localStorage.getItem('yourScore', yourScore.innerHTML) === null) {
    localStorage.setItem('yourScore', 0);
}
yourScore.innerHTML = localStorage.getItem('yourScore');

if (localStorage.getItem('gameScore', gameScore.innerHTML) === null) {
    localStorage.setItem('gameScore', 0);
}
gameScore.innerHTML = localStorage.getItem('gameScore');



// Disappring the start button after click it
play.addEventListener('click', (event) => {
    document.querySelector('.playContainer').style.display = 'none';
    document.querySelector('.box-container').style.display = 'grid';
});


// box1.addEventListener('click', boxClick);
function xOrO() {
    switch (miniRandom) {
        case 1:
            user = x;
            game = o;
            break;
        case 2:
            user = o;
            game = x;
            break;
    }
}

function start() { // start game
    xOrO(); // Chose who is 'X' and who is 'O'

    switch (miniRandom) {
        case 1:
            play.addEventListener('click', userTurn);
            break;
        case 2:
            play.addEventListener('click', gameTurn);
            break;
    }
}

let boxClick;

function userTurn() {
    addListener(box1);
    addListener(box2);
    addListener(box3);
    addListener(box4);
    addListener(box5);
    addListener(box6);
    addListener(box7);
    addListener(box8);
    addListener(box9);
}

// let boxClick; // Define boxClick in a broader scope

function addListener(box) {
    boxClick = () => {
        if (box.value === '') {
            box.value = user;
            check();
            if (win === false) gameTurn();
            box.removeEventListener('click', boxClick);

        }
    };

    box.addEventListener('click', boxClick);

}



function gameTurn() {
    let random = Math.round(Math.floor(Math.random() * 9) + 1);
    let a;
    switch (random) {
        case 1:
            boxNumber(box1);

            break;
        case 2:
            boxNumber(box2);

            break;
        case 3:
            boxNumber(box3);

            break;
        case 4:
            boxNumber(box4);

            break;
        case 5:
            boxNumber(box5);

            break;
        case 6:
            boxNumber(box6);


            break;
        case 7:
            boxNumber(box7);

            break;
        case 8:
            boxNumber(box8);

            break;
        case 9:
            boxNumber(box9);

            break;
    }
    if (win === false) userTurn();
}


function boxNumber(boxNum) {
    if (boxNum.value == '') {
        hide(boxNum);
        setTimeout(() => {
            boxNum.value = game;
            setTimeout(check, 3000);
        }, 300);
    } else {
        gameTurn();
    }

}


function hide(box) {
    box.removeEventListener('click', hide);
    box.style.pointerEvents = 'none';
}


function check() { // End game (Win/lose/tie)
    // Lines
    let row1 = box1.value + box2.value + box3.value;
    let row2 = box4.value + box5.value + box6.value;
    let row3 = box7.value + box8.value + box9.value;
    let collum1 = box1.value + box4.value + box7.value;
    let collum2 = box2.value + box5.value + box8.value;
    let collum3 = box3.value + box6.value + box9.value;

    let slant1 = box1.value + box5.value + box9.value;
    let slant2 = box3.value + box5.value + box7.value;

    // X won
    if (row1 === 'XXX' || row2 === 'XXX' || row3 === 'XXX' || collum1 === 'XXX' || collum2 === 'XXX' || collum3 === 'XXX' || slant1 === 'XXX' || slant2 === 'XXX') {

        win = true;

        if (user === x) {
            yourScore.innerHTML = parseInt(yourScore.innerHTML) + 1;
            localStorage.setItem('yourScore', yourScore.innerHTML);
            winOutput.style.display = 'block'
            winOutput.innerHTML = 'You won!'
            winOutput.addEventListener('click', () => {
                winOutput.style.display = 'none';
                location.reload();
            })

        } else {
            gameScore.innerHTML = parseInt(gameScore.innerHTML) + 1;
            localStorage.setItem('gameScore', gameScore.innerHTML);
            winOutput.style.display = 'block'
            winOutput.innerHTML = 'You lost!'
            winOutput.addEventListener('click', () => {
                winOutput.style.display = 'none';
                location.reload();
            })
        }

    }

    // O won
    else if (row1 === 'OOO' || row2 === 'OOO' || row3 === 'OOO' || collum1 === 'OOO' || collum2 === 'OOO' || collum3 === 'OOO' || slant1 === 'OOO' || slant2 === 'OOO') {

        win = true;

        if (user === o) {
            yourScore.innerHTML = parseInt(yourScore.innerHTML) + 1;
            localStorage.setItem('yourScore', yourScore.innerHTML);
            winOutput.style.display = 'block'
            winOutput.innerHTML = 'You Won!'
            winOutput.addEventListener('click', () => {
                winOutput.style.display = 'none';
                location.reload();
            })
        } else {
            gameScore.innerHTML = parseInt(gameScore.innerHTML) + 1;
            localStorage.setItem('gameScore', gameScore.innerHTML);
            winOutput.style.display = 'block'
            winOutput.innerHTML = 'You lost!'
            winOutput.addEventListener('click', () => {
                winOutput.style.display = 'none';
                location.reload();
            })
        }


    }

    // Tie
    else if (box1.value !== '' && box2.value !== '' && box3.value !== '' && box4.value !== '' && box5.value !== '' && box6.value !== '' && box7.value !== '' && box8.value !== '' && box9.value !== '') {
        win = true;
        winOutput.style.display = 'block'
        winOutput.innerHTML = 'Tie!'
        winOutput.addEventListener('click', () => {
            winOutput.style.display = 'none';
            location.reload();
        })
    }
}
start();




