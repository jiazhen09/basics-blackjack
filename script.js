// main function runs on each player's turn.

// the sequence of actions in the game would follow:

// 1. shuffling of deck
//  shuffle on page load.
// create an array consisting on all the cards? -> 52 cards
// create a random generator function to "shuffle" the cards - perhaps a number generator that randomly selects indexes and push into a new array.

// empty array to contain cards
let deck = [];
let shuffledDeck = [];

let firstCard;
let secondCard;

let splitCardOne;
let splitCardTwo;

let splitCardOneFinal = 0;
let splitCardTwoFinal = 0;
let splitcounter = 0;

let playerCardOne;
let dealerCardOne;
let playerCardTwo;
let dealerCardTwo;

let playerHitCard = 0;
let dealerHitCard = 0;

let total;

let playerFinalResult;
let computerFinalResult;

let gameMode = "playerTurn";

// declare suits value
let ace = 11;
let jack = 10;
let queen = 10;
let king = 10;

// var main = function (input) {
//   var shuffleDeck = 
//   var myOutputValue = "hello world";
//   return myOutputValue;
// };

// declare card elements
const SUITS = ["Spades", "Diamonds", "Club", "Heart"];
const VALUES = [
  ace,
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  jack,
  queen,
  king,
];

// 2. user clicks submit to deal cards
// When user click submit, the program gives the player 1 card facing up, then 1 card for the computer face down. The player then receives another card, face up, and then another for the dealer, face up.

let addCardsToDeck = function () {
  for (let p = 0; p < 6; p++) {
    for (let i = 0; i < SUITS.length; i++) {
      for (let h = 0; h < VALUES.length; h++) {
        deck.push(VALUES[h] + " " + SUITS[i]);
      }
    }
  }
};

addCardsToDeck();

let shuffleDeck = function () {
  for (let i = 0; i < deck.length; i++) {
    let shuffle = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck[shuffle]);
  }
};

// show one player card up, and one dealer card down.
let firstDealCard = function () {
  // shift = remove the first item from the array
  playerCardOne = shuffledDeck.shift();
  dealerCardOne = shuffledDeck.shift();
  console.log(dealerCardOne);

  playerCardTwo = shuffledDeck.shift();
  dealerCardTwo = shuffledDeck.shift();

  let result = `Player's first card: ${playerCardOne}<br><br>
  Player's second card: ${playerCardTwo}<br><br>
  Dealer's first card: hidden<br><br>
  Dealer's second card: ${dealerCardTwo}`;
  return result;
};

firstDealCard();

let hitCard = function () {
  // shift = remove the first item from the array
  if (gameMode == "playerTurn") {
    playerHitCard = shuffledDeck.shift();
  } else if (gameMode == "dealerTurn") {
    dealerHitCard = shuffledDeck.shift();
  }
  console.log(playerHitCard);
  return parseFloat(playerHitCard);
};

//  it's a button
//  you click button, the deck will come up with 2 cards, (ideal scenario is we can see the cards, instead of them telling me what the cards are.)

// 3. the player's hand and computer's hand are analyzed for winning conditions. e.g. blackjack.
// if user has blackjack, a notice will appear above the cards. else proceed to the next step.

let convertValue = function(input1, input2){
  firstCard = parseFloat(input1);
  console.log(firstCard);
  secondCard = parseFloat(input2);
  console.log(secondCard);
}

// only work for player game mode
let splitCards = function(){ 
  if (firstCard == secondCard){
    return "Player to choose split or stay.";
  }
  else {return "Calculating total value";
  // continue with totalValue logic 
  }
}

let choosesplit = function(){
  // after choosing split for the first time, counter splitcardonefinal + split card
  splitCardOneFinal += firstCard
  splitCardTwoFinal += secondCard
 // after choosing split for the first time, counter above + new cards given
    splitCardOne = hitCard();
    splitCardOneFinal += splitCardOne;
    splitCardTwo = hitCard();
    splitCardTwoFinal += splitCardTwo;
    splitcounter +=1;

    if (splitcounter == 3)
    {return "No more splits.";} 
  else {return "Continue";}
}

// i < 2 (0,1,2 = 3 times)

let totalValue = function () {
  if (firstCard + secondCard <= 10) {
    ace = 1;
  } else {
    ace = 11;
  }

  total = firstCard + secondCard;

  if (total == 21) {
    return "black jack";
  }

  console.log(total);
  return total;
}

// give total value for player card. player will hit or stand.

// 4. the user will decide whether to hit or stand.
// a, either decide by using submit button with input
// b, buttons to decide the choice

let playerChoice = function (hitOrStand) {
  if (hitOrStand == "hit") {
    // then deal another card for the player
    total += hitCard();
    if (total < 21) {
      return `Your new total is ${total}. Choose hit or stand for next round.`;
    } else if (total == 21) {
      return `Player has 21, It is now the dealer's turn.`;
    } else {
      return `Your new total is ${total}. You died.`;
    }
  } else if (hitOrStand == "stand") {
    // then the player turn ends
    gameMode == "dealerTurn";
    console.log("End turn");
    playerFinalResult = total;
    return `Player's turn has ended. It is now the Dealer's turn.`;
  }
};

let computerChoice = function () {
  // if computer's total is blackjack, win.
  // if computer's total is below 16, hit.
  // if computer's opening hand is 17, stand.
  // if computer's total is above player's total hand, stand.
  // if computer's hit total is above 18, stand.
  totalValue(dealerCardOne, dealerCardTwo);
  console.log(dealerCardOne);
  console.log(dealerCardTwo);

  let result;
  if (total == 21) {
    result = "black jack";
  } else if (total > 16) {
    result = "Stand";
    // new total;
  } else if (total <= 16) {
    total += hitCard();
    result = total;
  } else if (total < 18) {
    total += hitCard();
    result = total;
  } else if (total > 18) {
    result = "Stand";
  } else if (total > 21) {
    result = `Computer hand is ${total}. He died.`;
  }
  computerFinalResult = total;
  return result;
};

let winner = function () {
  if (playerFinalResult > computerFinalResult) {
    return "Player wins!";
  } else if (playerFinalResult < computerFinalResult) {
    return "Player lose!";
  } else {
    return "Draw!";
  }
};

// draw or skip

// 5. the cards are analysed for winning/losing conditions.
// 21? bust?

// 6. once the player has decide to end the turn, the computer will now hit or stand automatically based on the game rules.

// 7. the winner of the round will be decided, and the game comes to an end with an option to play another round.

shuffleDeck();

// Splits
// Add hand-splitting functionality to the game. If the player has two of the same kind of card, they can choose to split and get dealt 2 new cards. Full splitting rules here. Dealer is not allowed to split.