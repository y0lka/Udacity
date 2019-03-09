//select the deck to create the card container
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const resetBtn = document.querySelector('.restart');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let openedCard; //checks if open card is matching
//let matchingCard = 0; //matches found
let moveCounter = 0;
let second = 0;
let minute = 0;
let gameState = 'start';
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


function showCard(e) {
    const currentCard = e.currentTarget;
    const firstCard = openedCard;

    if (currentCard.classList.contains('open')) {
        return;
    }
    currentCard.classList.add('show', 'open');
    openedCard = currentCard;

    incrementMoveCounter();

    // if first card is already selected
    if (firstCard !== undefined) {
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
}


function incrementMoveCounter() {
    moves.innerHTML = ++moveCounter;

    if (moveCounter === cards.length + cards.length / 2 ||
        moveCounter === 2 * cards.length) {
        let stars = document.querySelectorAll('.fa-star')
        stars[stars.length - 1].remove();
    }
}

//function resetMoveCounter() {
//    moves.innerHTML = '0';
//}

checkVictory = function () {
    var matchedCards = document.querySelectorAll('.match');
    if (matchedCards.length === cards.length) {
        setTimeout(function () {
            alert("Game over");
        }, 500);
    }
}





function init() {
    cardArr = shuffle(cards);

    //loop over arr and add cardArr
    for (let i = 0; i < cards.length; i++) {
        //create cards
        const card = document.createElement('li');

        card.innerHTML = `<i class='fa ${cards[i]}'></i>`
        card.className = 'card';
        deck.appendChild(card);
        card.addEventListener('click', showCard);
    }
}


init();























/*function showCard(event) {
    const currentCard = event.target;
    const firstCard = turnedCards[0];

    if (currentCard.classList.contains('show', 'open')) {
        return;
    }

    currentCard.classList.add('show', 'open');

    if (turnedCards.length === 1) {

        if (firstCard.innerHTML !== currentCard.innerHTML) {
            turnedCardTemp = turnedCards;
            setTimeout(function () {
                currentCard.classList.remove('show', 'open');
                firstCard.classList.remove('show', 'open');
            }, 500);

        }
        turnedCards = [];

        if (firstCard.innerHTML === currentCard.innerHTML) {
            currentCard.classList.add('match');
            firstCard.classList.add('match');
        }
    } else {
        turnedCards[0] = currentCard;
    }
}






/*let restartBtn = document.getElementsByClassName('restart')[0];
restartBtn.addEventListener('click', function () {
    console.log('The document was clicked');
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function flipCard(click) {
//click.target.classList.add('open', 'show');
// flippedCards.push(card);


//set up the event listener for a card. If a card is clicked:

//display the card's symbol (put this functionality in another function that you call from this one)

//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//if the list already has another card, check to see if the two cards match
/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */