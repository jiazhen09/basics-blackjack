var dealerSum = 0;
var playerSum = 0;

var dealerAceCounter = 0;
var playerAceCounter = 0; 

var hidden;
var deck;

var okToHit = true; 

window.onload = function() {
    createDeck();
    shuffleDeck();
    startRolling();
}

document.getElementById("input-field").addEventListener("change", (e)=>{ 
  document.getElementById("output-div").innerHTML= `Welcome ${e.target.value} to Casino Blackjack! <p>  Click 'Hit' or 'Stand' to play and best of luck! <p> Click 'Restart' for the next round! </p>`

});

var createDeck = function (){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let h = 0; h < values.length; h++) {
            deck.push(values[h] + "-" + suits[i]); //A-C -> K-C, A-D -> K-D
        }
    }
}

var shuffleDeck = function(){
  mixDeck = [];
    for (let i = 0; i < deck.length; i++) {
        let h = Math.floor(Math.random() * deck.length); 
        mixDeck.push(deck[h]);
    }
}

var startRolling = function () {
    hidden = mixDeck.pop(); 
    dealerSum += assessValue(hidden);
    dealerAceCounter += checkAce(hidden);

    for (let i = 0; i < 1; i++) {
      let cardImg = document.createElement("img");
      let card = mixDeck.pop();
      cardImg.src = "./cards/" + card + ".png";
      dealerSum += assessValue(card);
      dealerAceCounter += checkAce(card);
      document.getElementById("dealer-cards").append(cardImg); 
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = mixDeck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += assessValue(card);
        playerAceCounter += checkAce(card);
        document.getElementById("player-cards").append(cardImg); 
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("restart").style.visibility = "hidden"

}

var hit = function () {
    if (!okToHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = mixDeck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += assessValue(card);
    playerAceCounter += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (dropAce(playerSum, playerAceCounter) >= 21) { 
        okToHit = false;
        document.getElementById("hit").disabled = true;

    }

}

var stand = function () {
    playerSum = dropAce(playerSum, playerAceCounter);

    okToHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"; 

    while (dealerSum < 17) {
      let cardImg = document.createElement("img");
      let card = mixDeck.pop();
      cardImg.src = "./cards/" + card + ".png";
      dealerSum += assessValue(card);
      dealerAceCounter += checkAce(card);
      document.getElementById("dealer-cards").append(cardImg);
      document.getElementById("stand").disabled = true;
  }

  dealerSum = dropAce(dealerSum, dealerAceCounter);

  console.log("Player Final Sum ->", playerSum);
  console.log("Dealer Final Sum ->", dealerSum);

    let outputMessage = "";
    if (playerSum > 21) {
      outputMessage = "Oops, You Lose!"; 
    }
    else if (dealerSum > 21) {
      outputMessage = "Congrats, You win!";
    }

    else if (playerSum == 21 && dealerSum == 21) {
      outputMessage = "Rare Blackjack Tie!";
    }
    else if (playerSum == 21 && dealerSum != 21) {
      outputMessage = "Double Congrats, You have a Blackjack win!";
    }

    else if (playerSum == dealerSum) {
      outputMessage = "Close fight, it's a Tie!";
    }
    else if (playerSum > dealerSum) {
      outputMessage = "Congrats, You Win!";
    }
    else if (playerSum < dealerSum) {
      outputMessage = "Oops, You Lose!";
    }

    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = outputMessage;

    document.getElementById("restart").style.visibility = "visible";
    document.getElementById("restart").addEventListener("click", restart);

}
var restart = function () {
  window.location.reload();
    }

var assessValue = function(card){
    let dataarray = card.split("-"); 
    let value = dataarray[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value); 
}

var checkAce = function(card){
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function dropAce(mySum, myAceCounter) {
    while (mySum > 21 && myAceCounter > 0) {
        mySum -= 10;
        myAceCounter -= 1;
    }
    return mySum;
}

