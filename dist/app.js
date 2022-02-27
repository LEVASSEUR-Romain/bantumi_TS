"use strict";
// déclaration des variables
const tokenStart = 4;
const boardPlayer1 = document.getElementsByClassName("player1");
const boardPlayer2 = document.getElementsByClassName("player2");
const atticsPlayer1 = document.getElementById("attics1");
const atticsPlayer2 = document.getElementById("attics2");
const atticsStart = 0;
const withBoardPlayer = 6;
const playerStart = 1;
const eventListenerBoard = (player) => {
  const playerElementBoard = player == 1 ? boardPlayer1 : boardPlayer2;
  for (let i = 0; i < withBoardPlayer; i++) {
    playerElementBoard[i].addEventListener("click", (e) => {
      playerClickOnBoard(e);
    });
  }
};
const stratGame = () => {
  for (let i = 0; i < withBoardPlayer; i++) {
    boardPlayer1[i].innerHTML = tokenStart.toString();
    boardPlayer2[i].innerHTML = tokenStart.toString();
  }
  if (atticsPlayer1 && atticsPlayer2) {
    atticsPlayer1.innerText = atticsStart.toString();
    atticsPlayer2.innerText = atticsStart.toString();
  }
  eventListenerBoard(playerStart);
};
stratGame();
const playerClickOnBoard = (event) => {};
// gérer les greniers de joueur 1 et 2
// distribution des points
// condition pour ramaser grenier 2-3 on ramaser les alentours aussi
// gerer la partie avec un bot
