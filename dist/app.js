"use strict";
//variable modifiable
const tokenStart = 4;
const playerStart = 1;
const winToken = [2, 3];
// déclaration des variables
const boardPlayer1 = document.getElementsByClassName("player1");
const boardPlayer2 = document.getElementsByClassName("player2");
const atticsPlayer1 = document.getElementById("attics1");
const atticsPlayer2 = document.getElementById("attics2");
const atticsStart = 0;
const withBoardPlayer = 6;
let playerTurn = playerStart;
const player1 = 1;
const player2 = 2;
const emptyHtml = 0;
const targetMin = 1;
const targetMax = 12;
const idBoard = "target_";
const addeventListenerBoard = () => {
    let playerElementBoard = boardPlayer1;
    for (let i = 0; i < withBoardPlayer; i++) {
        if (parseInt(playerElementBoard[i].innerHTML) !== 0) {
            playerElementBoard[i].addEventListener("click", (e) => {
                distrubutionToken(e);
            });
        }
    }
    playerElementBoard = boardPlayer2;
    for (let i = 0; i < withBoardPlayer; i++) {
        if (parseInt(playerElementBoard[i].innerHTML) !== 0) {
            playerElementBoard[i].addEventListener("click", (e) => {
                distrubutionToken(e);
            });
        }
    }
};
const stratGame = () => {
    for (let i = 0; i < withBoardPlayer; i++) {
        boardPlayer1[i].innerHTML = tokenStart.toString();
        boardPlayer2[i].innerHTML = tokenStart.toString();
    }
    if (atticsPlayer1 && atticsPlayer2) {
        atticsPlayer1.innerHTML = atticsStart.toString();
        atticsPlayer2.innerHTML = atticsStart.toString();
    }
    addeventListenerBoard();
};
// on lance la game **************************************************
stratGame();
const distrubutionToken = (event) => {
    // ici on verifira qui joue sinon on active pas les add Event listener
    const liTarget = event.target;
    const tokenTarget = parseInt(liTarget.innerHTML);
    const localisationTarget = getNumberLocalisationTarget(liTarget);
    removeTokenTarget(liTarget);
    let boardBrowse = localisationTarget + 1;
    let boardLiElementToIncrement;
    for (let i = 0; i < tokenTarget; i++) {
        if (boardBrowse > targetMax) {
            boardBrowse = targetMin;
        }
        boardLiElementToIncrement = document.getElementById(idBoard + boardBrowse);
        incrementOfOneTheLi(boardLiElementToIncrement);
        boardBrowse++;
    }
    const lastPostionTokenincrement = boardBrowse;
    //removeTokenOnBoard(lastPostionTokenincrement);
};
const getNumberLocalisationTarget = (liElement) => {
    return parseInt(liElement.id.split("_")[1]);
};
const getTokenTarget = (liElement) => {
    return parseInt(liElement.innerHTML);
};
const incrementOfOneTheLi = (liElement) => {
    liElement.innerHTML = (getTokenTarget(liElement) + 1).toString();
};
const removeTokenTarget = (liElement) => {
    liElement.innerHTML = emptyHtml.toString();
};
const addToAtticsPlayer = (numberToadd) => {
    if (playerTurn === player1) {
        atticsPlayer1.innerHTML = (parseInt(atticsPlayer1.innerHTML) + numberToadd).toString();
    }
    if (playerTurn === player2) {
        atticsPlayer2.innerHTML = (parseInt(atticsPlayer2.innerHTML) + numberToadd).toString();
    }
};
const liElementAfter = (placeNumber) => {
    let calculPlace = placeNumber - 1;
    calculPlace = calculPlace == 0 ? targetMax : calculPlace;
    return document.getElementById(idBoard + calculPlace);
};
const removeTokenOnBoard = (lastPostion) => {
    const liLastElementIncrement = document.getElementById(idBoard + lastPostion);
    if (getTokenTarget(liLastElementIncrement) === winToken[0] ||
        getTokenTarget(liLastElementIncrement) === winToken[1]) {
        addToAtticsPlayer(getTokenTarget(liLastElementIncrement));
        removeTokenTarget(liLastElementIncrement);
        if (playerTurn === player1) {
            let positionInWhile = 0;
            // tant que la cible suivante (attention au sens des aigules d'une montre) a un nombre de token
            // egale a 2 ou 3 on fait sinon on arréte
        }
        if (playerTurn === player2) {
        }
    }
};
// gérer les greniers de joueur 1 et 2
// distribution des points
// condition pour ramaser grenier 2-3 on ramaser les alentours aussi
// gerer la partie avec un bot
