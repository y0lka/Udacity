/*
 * Create a list that holds all of your cards */



const cardArr = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
];

//shuffle the cards 
cardArr.sort(function() { return 0.5 - Math.random() });

const cardContainer = document.getElementsByClassName('deck')[0];

let flippedCards = [];
//create cards
for (let i = 0; i < cardArr.length; i++) {
    const card = document.createElement('li');
    cardContainer.appendChild(card);
    card.className = `card ${cardArr[i]}`;
    


//click event on the cards
card.addEventListener("click", flipCard);
function flipCard(click){
    click.target.classList.add('open', 'show');
    flippedCards.push(this);
};

}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




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