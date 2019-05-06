//select the deck to create the card container
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const resetBtn = document.querySelector('.restart');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
let openedCard;
let moveCounter = 0;
let seconds = 0;
let minutes = 0;
let gameState = 'initial';
let interval;

// Create a list that holds all of your cards
let cards = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
];

//shuffles array
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//turn over a card
function showCard(e) {
    const currentCard = e.currentTarget;
    const firstCard = openedCard;

    if (currentCard.classList.contains('open')) {
        return;
    }
    currentCard.classList.add('show', 'open');
    openedCard = currentCard;

    incrementMoveCounter();
    initTimer();

    // if first card is already turned over
    if (firstCard !== undefined) {

        //if the turned over cards match
        if (currentCard.innerHTML === firstCard.innerHTML) {
            currentCard.classList.add('match');
            firstCard.classList.add('match');
            checkVictory();
        } else {
            setTimeout(function () {
                currentCard.classList.remove('open', 'show');
                firstCard.classList.remove('open', 'show');
            }, 500);
        }
        openedCard = undefined;
    }

    if (gameState === 'initial') {
        gameState = 'playing';
    }
}

function incrementMoveCounter() {
    moves.innerHTML = ++moveCounter;
    if (moveCounter === cards.length + cards.length / 2 ||
        moveCounter === 2 * cards.length) {
        let stars = document.querySelectorAll('.fa-star');
        stars[stars.length - 1].remove();
    }
}

function checkVictory() {
    var matchedCards = document.querySelectorAll('.match');
    //checking if all the cards were matched
    if (matchedCards.length === cards.length) {
        setTimeout(function () {
            //stopping the timer
            stopTimer();
            
            const minutes = minutesElement.innerHTML;
            const seconds = secondsElement.innerHTML;
            const stars = document.querySelectorAll('.fa-star');
            const modal = document.querySelector('#modalContainer');
            //displaying the timer in the popup
            document.getElementById('totalTime').innerHTML = `${minutes} : ${seconds}`;
            //displaying the move counter in the popup
            document.getElementById('totalMove').innerHTML = `${moveCounter}`;
            //displaying up the stars rating in the popup
            const starsContainer = document.getElementById('starRating');

            for (let i = 0; i < stars.length; i++) {
                const starIcon = document.createElement('i');
                starIcon.classList.add('fa', 'fa-star');
                starsContainer.appendChild(starIcon);
            }
            //displaying the popup modal
            modal.style.display = 'block';

        }, 500);
    }
}

//timer function
function initTimer() {

    if (gameState !== 'initial') {
        return;
    }

    interval = setInterval(function () {
        let normalisedSeconds = ++seconds % 60;

        if (normalisedSeconds === 0) {
            minutes++;
        }

        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = normalisedSeconds;

    }, 1000);
}

//stop timer function
function stopTimer() {
    clearInterval(interval);
}

//reset timer function
function resetTimer() {
    minutesElement.innerHTML = 0;
    secondsElement.innerHTML = 0;
    minutes = 0;
    seconds = 0;
    clearInterval(interval);
}

//reset moves
function resetMoves() {
    moveCounter = 0;
    moves.innerHTML = 0;
    let stars = document.querySelectorAll('.fa-star');
    for (let i = 0; i < stars.length; i++) {
        stars[i].remove();
    }

    //reset stars
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i <= 2; i++) {
        const star = document.createElement('li');
        const starIcon = document.createElement('i');
        starIcon.classList.add('fa', 'fa-star');
        star.appendChild(starIcon);
        starsContainer.appendChild(star);
    }
}

//Closing the popup modal when we click play again

document.getElementById('button').addEventListener('click', function closeModal() {
    document.querySelector('#modalContainer').style.display = 'none';
    resetGame();
});


//Resetting the game when we click the reset button
resetBtn.addEventListener('click', resetGame);

//Reset game function
function resetGame() {
    deck.innerHTML = '';
    resetMoves();
    resetTimer();
    init();
}

//Display the cards on the page and set up the event listener for a card

function init() {
    cardArr = shuffle(cards);
    gameState = 'initial';

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('li');
        card.innerHTML = `<i class='fa ${cards[i]}'></i>`
        card.className = 'card';
        deck.appendChild(card);
        card.addEventListener('click', showCard);
    }
}

init();