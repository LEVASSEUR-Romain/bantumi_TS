// déclaration des variables
const tokenStart: number = 4;
const boardPlayer1 = document.getElementsByClassName("player1");
const boardPlayer2 = document.getElementsByClassName("player2");
const atticsPlayer1 = document.getElementById("attics1");
const atticsPlayer2 = document.getElementById("attics2");
const atticsStart: number = 0;
const withBoardPlayer: number = 6;
const playerStart: number = 1;

const eventListenerBoard = (player: number): void => {
  const playerElementBoard = player == 1 ? boardPlayer1 : boardPlayer2;
  for (let i = 0; i < withBoardPlayer; i++) {
    playerElementBoard[i].addEventListener("click", (e) => {
      playerClickOnBoard(e);
    });
  }
};
const stratGame = (): void => {
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
const playerClickOnBoard = (event: Event) => {};

// gérer les greniers de joueur 1 et 2
// distribution des points
// condition pour ramaser grenier 2-3 on ramaser les alentours aussi

// gerer la partie avec un bot
