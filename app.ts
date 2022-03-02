//variable modifiable
const tokenStart: number = 2;
const playerStart: number = 1;
const winToken: number[] = [2, 3];
// déclaration des variables
const boardPlayer1 = document.getElementsByClassName("player_1");
const boardPlayer2 = document.getElementsByClassName("player_2");
const spanPlayerTurn = document.getElementById(
  "playerToPlay"
) as HTMLSpanElement;
const atticsPlayer1 = document.getElementById("attics1") as HTMLDivElement;
const atticsPlayer2 = document.getElementById("attics2") as HTMLDivElement;
const atticsStart: number = 0;
const withBoardPlayer: number = 6;
let playerTurn: number = playerStart;
const player1 = 1;
const player2 = 2;
const emptyHtml: number = 0;
const targetMin: number = 1;
const targetMax: number = 12;
const idBoard: string = "target_";
const addeventListenerBoard = (): void => {
  let playerElementBoard = boardPlayer1;
  for (let i = 0; i < withBoardPlayer; i++) {
    if (parseInt(playerElementBoard[i].innerHTML) !== 0) {
      playerElementBoard[i].addEventListener("click", (e) => {
        distributionToken(e);
      });
    }
  }
  playerElementBoard = boardPlayer2;
  for (let i = 0; i < withBoardPlayer; i++) {
    if (parseInt(playerElementBoard[i].innerHTML) !== 0) {
      playerElementBoard[i].addEventListener("click", (e) => {
        distributionToken(e);
      });
    }
  }
};
const stratGame = (): void => {
  for (let i = 0; i < withBoardPlayer; i++) {
    boardPlayer1[i].innerHTML = tokenStart.toString();
    boardPlayer2[i].innerHTML = tokenStart.toString();
  }
  if (atticsPlayer1 && atticsPlayer2) {
    atticsPlayer1.innerHTML = atticsStart.toString();
    atticsPlayer2.innerHTML = atticsStart.toString();
  }
  addeventListenerBoard();
  showTurnPlayer();
};

const distributionToken = (event: Event) => {
  const liTarget = event.target as HTMLLIElement;
  if (getNumberPlayer(liTarget) === playerTurn) {
    const tokenTarget: number = parseInt(liTarget.innerHTML);
    const localisationTarget: number = getNumberLocalisationTarget(liTarget);
    removeTokenTarget(liTarget);
    let boardBrowse = localisationTarget + 1;
    let boardLiElementToIncrement: HTMLLIElement;
    for (let i = 0; i < tokenTarget; i++) {
      if (boardBrowse > targetMax) {
        boardBrowse = targetMin;
      }
      boardLiElementToIncrement = document.getElementById(
        idBoard + boardBrowse
      ) as HTMLLIElement;
      incrementOfOneTheLi(boardLiElementToIncrement);
      boardBrowse++;
    }
    const LastAddEndFor = 1;
    const lastPostionTokenincrement =
      boardBrowse == targetMin ? targetMax : boardBrowse - LastAddEndFor;
    removeTokenOnBoardAddPointChangePlayerTurn(lastPostionTokenincrement);
  }
};
const getNumberPlayer = (liElement: HTMLLIElement): number => {
  return parseInt(liElement.className.split("_")[1]);
};
const getNumberLocalisationTarget = (liElement: HTMLLIElement): number => {
  return parseInt(liElement.id.split("_")[1]);
};
const getTokenTarget = (liElement: HTMLLIElement): number => {
  return parseInt(liElement.innerHTML);
};
const incrementOfOneTheLi = (liElement: HTMLLIElement): void => {
  liElement.innerHTML = (getTokenTarget(liElement) + 1).toString();
};
const removeTokenTarget = (liElement: HTMLLIElement): void => {
  liElement.innerHTML = emptyHtml.toString();
};
const addToAtticsPlayer = (numberToadd: number): void => {
  if (playerTurn === player1) {
    atticsPlayer1.innerHTML = (
      parseInt(atticsPlayer1.innerHTML) + numberToadd
    ).toString();
  }
  if (playerTurn === player2) {
    atticsPlayer2.innerHTML = (
      parseInt(atticsPlayer2.innerHTML) + numberToadd
    ).toString();
  }
};
const liElementAfter = (LiElement: HTMLLIElement): HTMLLIElement => {
  let calculPlace = getNumberLocalisationTarget(LiElement) - 1;
  calculPlace = calculPlace == 0 ? targetMax : calculPlace;
  return document.getElementById(idBoard + calculPlace) as HTMLLIElement;
};
const showTurnPlayer = (): void => {
  spanPlayerTurn.innerText = playerTurn.toString();
};
const changePlayerTurn = (): void => {
  playerTurn = playerTurn == player1 ? player2 : player1;
  showTurnPlayer();
};
const removeTokenOnBoardAddPointChangePlayerTurn = (
  lastPostion: number
): void => {
  const liLastElementIncrement = document.getElementById(
    idBoard + lastPostion
  ) as HTMLLIElement;
  if (
    getTokenTarget(liLastElementIncrement) === winToken[0] ||
    getTokenTarget(liLastElementIncrement) === winToken[1]
  ) {
    addToAtticsPlayer(getTokenTarget(liLastElementIncrement));
    removeTokenTarget(liLastElementIncrement);
    let LiLast = liLastElementIncrement;
    while (
      getTokenTarget(liElementAfter(LiLast)) == winToken[0] ||
      getTokenTarget(liElementAfter(LiLast)) == winToken[1]
    ) {
      LiLast = liElementAfter(LiLast);
      addToAtticsPlayer(getTokenTarget(LiLast));
      removeTokenTarget(LiLast);
    }
  }
  changePlayerTurn();
};
const isEndGame = (): boolean => {};
const endGame = (): void => {};
// on lance la game **************************************************
stratGame();
// gerer la partie avec un bot
