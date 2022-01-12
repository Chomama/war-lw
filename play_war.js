#!/usr/local/bin/node
const e = require("express");
var fs = require("fs");

const CARDS = ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14',
'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14',
'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14',
'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14'];

const gameStates = {
  notStarted: "notStarted",
  inProgress: "inProgress",
  done: "done",
};

//vars that hold state of the game
var globalPlayerOneDeck = [];
var globalPlayerTwoDeck = [];
var globalPlayerOnePlayedCard = null;
var globalPlayerTwoPlayedCard = null;
var globalRoundWinner = null;
var globalRoundStatus = null;
var globalGameState = gameStates.notStarted;
var intervalId = null;

//initializes the starting values of the game
function startGame() {
  var shuffledDeck = CARDS.sort(() => Math.random() - 0.5);
  globalPlayerOneDeck = shuffledDeck.slice(0, 26);
  globalPlayerTwoDeck = shuffledDeck.slice(26);
}

//plays one round of the game
function playRound() {
  //clears the timer if game is over
  if (globalGameState === gameStates.done) {
    clearInterval(intervalId);
    return;
  }
  var p1DeckCopy = globalPlayerOneDeck;
  var p2DeckCopy = globalPlayerTwoDeck;
  var cardsWon = [];
  var roundWinner;
  var roundStatus;
  var gameState = gameStates.inProgress;

  //gets cards from each players deck and adds them to the winners pool cardsWon
  var playerOneCard = p1DeckCopy.shift();
  var playerTwoCard = p2DeckCopy.shift();
  cardsWon.push(playerOneCard, playerTwoCard);

  //parses int from card values using regex
  var playerOneCardVal = parseInt(playerOneCard.replace(/[^\d.]/g, ""));
  var playerTwoCardVal = parseInt(playerTwoCard.replace(/[^\d.]/g, ""));

  //war
  if (playerOneCardVal === playerTwoCardVal) {
    var inWar = true;
    //continues until war is over(in case of tie)
    while (inWar) {
      //ends game if player does not have enough cards to play war
      if (p1DeckCopy.length < 2) {
        inWar = false;
        roundWinner = "playerOne";
        roundStatus = "Player one is out of cards.  Player two wins!";
        gameState = gameStates.done;
        updatePlayerScore("playerTwo");
      } else if (p2DeckCopy.length < 2) {
        inWar = false;
        roundWinner = "playerTwo";
        roundStatus = "Player two is out of cards.  Player one wins!";
        gameState = gameStates.done;
        updatePlayerScore("playerOne");
      } else {
        //takes out two cards each and adds to winners
        var playerOneWarCard = p1DeckCopy.shift();
        var playerTwoWarCard = p2DeckCopy.shift();
        var playerOneWarCardVal = parseInt(
          playerOneWarCard.replace(/[^\d.]/g, "")
        );
        var playerTwoWarCardVal = parseInt(
          playerTwoWarCard.replace(/[^\d.]/g, "")
        );
        cardsWon.push(playerOneWarCard, playerTwoWarCard);
        var playerOneFaceDownCard = p1DeckCopy.shift();
        var playerTwoFaceDownCard = p2DeckCopy.shift();
        cardsWon.push(playerOneFaceDownCard, playerTwoFaceDownCard);
        //player one wins war
        if (playerOneWarCardVal > playerTwoWarCardVal) {
          roundWinner = "playerOne";
          p1DeckCopy.push(...cardsWon);
          inWar = false;
          roundStatus =
            "War was declared.  Player 1 won the war and received " +
            cardsWon.length +
            "cards.";
        //player two wins war
        } else if (playerTwoWarCardVal > playerOneWarCardVal) {
          roundWinner = "playerTwo";
          p2DeckCopy.push(...cardsWon);
          inWar = false;
          roundStatus =
            "War was declared.  Player 2 won the war and received " +
            cardsWon.length +
            "cards";
        }
      }
    }
  } else {
    //normal round camparisons
    if (playerOneCardVal > playerTwoCardVal) {
      roundWinner = "playerOne";
      p1DeckCopy.push(...cardsWon);
      roundStatus = "Player One won " + cardsWon.length + " cards";
    } else {
      roundWinner = "playerTwo";
      p2DeckCopy.push(...cardsWon);
      roundStatus = "Player Two won " + cardsWon.length + " cards";
    }
  }

  //win scenarios
  if (p1DeckCopy.length === 0) {
    roundStatus = "Player one has no cards left. PLAYER TWO HAS WON!";
    gameState = gameStates.done;
    //calls function to update score in json
    updatePlayerScore("playerTwo");
  } else if (p2DeckCopy.length === 0) {
    roundStatus = "Player two has no cards left. PLAYER ONE HAS WON!";
    gameState = gameStates.done;
    updatePlayerScore("playerOne");
  }
  // console.log("END OF ROUND_____________________");
  // console.log("ROUND WINNER: " + roundWinner);
  // console.log("P1 has " + p1DeckCopy.length + " cards left.");
  // console.log("P2 has " + p2DeckCopy.length + " cards left.");
  // console.log("ROUND STATUS: " + roundStatus);

  //updates all game state 
  globalPlayerOneDeck = p1DeckCopy;
  globalPlayerTwoDeck = p2DeckCopy;
  globalRoundWinner = roundWinner;
  globalRoundStatus = roundStatus;
  globalPlayerOnePlayedCard = playerOneCard;
  globalPlayerTwoPlayedCard = playerTwoCard;
  globalGameState = gameState;
}

//updates score in json file 
function updatePlayerScore(playerId) {
  data = fs.readFileSync(__dirname + "/" + "score.json", "utf8");
  var users = JSON.parse(data);
  if (playerId === "playerOne") {
    users["playerOne"]["score"] += 1;
  } else {
    users["playerTwo"]["score"] += 1;
  }
  fs.writeFileSync(__dirname + "/" + "./score.json", JSON.stringify(users));
}

startGame();
intervalId = setInterval(playRound, 200);
