"use strict";
//variable modifiable
const tokenStart = 4;
const playerStart = 1;
const winToken = [2, 3];
const winCondition = (tokenStart * 12) / 2;
// déclaration des variables
const boardPlayer1 = document.getElementsByClassName("player_1");
const boardPlayer2 = document.getElementsByClassName("player_2");
const spanPlayerTurn = document.getElementById("playerToPlay");
const atticsPlayer1 = document.getElementById("attics1");
const atticsPlayer2 = document.getElementById("attics2");
const newGame = document.getElementById("newGame");
const atticsStart = 0;
const withBoardPlayer = 6;
let playerTurn = playerStart;
const player1 = 1;
const player2 = 2;
const emptyHtml = 0;
const targetMin = 1;
const targetMax = 12;
const idBoard = "target_";
newGame.addEventListener("click", () => {
    stratGame();
});
const addeventListenerBoard = () => {
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
    showTurnPlayer();
};
const distributionToken = (event) => {
    const liTarget = event.target;
    if (getNumberPlayer(liTarget) === playerTurn &&
        parseInt(liTarget.innerText) != 0) {
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
        const LastAddEndFor = 1;
        const lastPostionTokenincrement = boardBrowse == targetMin ? targetMax : boardBrowse - LastAddEndFor;
        removeTokenOnBoardAddPointChangePlayerTurn(lastPostionTokenincrement);
    }
};
const getNumberPlayer = (liElement) => {
    return parseInt(liElement.className.split("_")[1]);
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
const liElementAfter = (LiElement) => {
    let calculPlace = getNumberLocalisationTarget(LiElement) - 1;
    calculPlace = calculPlace == 0 ? targetMax : calculPlace;
    return document.getElementById(idBoard + calculPlace);
};
const showTurnPlayer = () => {
    spanPlayerTurn.innerText = playerTurn.toString();
};
const changePlayerTurn = () => {
    playerTurn = playerTurn == player1 ? player2 : player1;
    showTurnPlayer();
};
const removeTokenOnBoardAddPointChangePlayerTurn = (lastPostion) => {
    const liLastElementIncrement = document.getElementById(idBoard + lastPostion);
    if (getTokenTarget(liLastElementIncrement) === winToken[0] ||
        getTokenTarget(liLastElementIncrement) === winToken[1]) {
        addToAtticsPlayer(getTokenTarget(liLastElementIncrement));
        removeTokenTarget(liLastElementIncrement);
        let LiLast = liLastElementIncrement;
        while (getTokenTarget(liElementAfter(LiLast)) == winToken[0] ||
            getTokenTarget(liElementAfter(LiLast)) == winToken[1]) {
            LiLast = liElementAfter(LiLast);
            addToAtticsPlayer(getTokenTarget(LiLast));
            removeTokenTarget(LiLast);
        }
    }
    if (isEndGameOrEgalite()) {
        endGame();
    }
    changePlayerTurn();
    if (playerCantPlay()) {
        endGameNotPlay();
    }
};
const isEndGameOrEgalite = () => {
    if (parseInt(atticsPlayer1.innerText) > winCondition ||
        parseInt(atticsPlayer2.innerText) > winCondition) {
        return true;
    }
    if (parseInt(atticsPlayer1.innerText) === winCondition &&
        parseInt(atticsPlayer2.innerText) === winCondition) {
        endGame();
    }
    return false;
};
const playerCantPlay = () => {
    const boardPlayer = Array.prototype.slice.call(playerTurn === 1 ? boardPlayer1 : boardPlayer2);
    const initial = boardPlayer[0].innerText;
    const total = boardPlayer.reduce((a, b) => {
        return parseInt(a) + parseInt(b.innerText);
    }, initial);
    if (total === 0) {
        return true;
    }
    else {
        return false;
    }
};
const endGameNotPlay = () => {
    // le current player recupere tous les points de l'enemenie
    const boardPlayer = Array.prototype.slice.call(playerTurn === 1 ? boardPlayer2 : boardPlayer1);
    const initial = boardPlayer[0].innerText;
    const total = boardPlayer.reduce((a, b) => {
        return parseInt(a) + parseInt(b.innerText);
    }, initial);
    // On incrémente le score et fin du jeu
    addToAtticsPlayer(total);
    endGame();
};
const endGame = () => {
    let winner = "";
    if (parseInt(atticsPlayer1.innerText) > winCondition) {
        winner = "Player 1";
        console.log(winner);
    }
    if (parseInt(atticsPlayer2.innerText) > winCondition) {
        winner = "Player 2";
    }
    if (parseInt(atticsPlayer1.innerText) === parseInt(atticsPlayer2.innerText)) {
        alert("Match nul");
    }
    else {
        console.log(winner);
        alert("le gagnant est : " + winner + " ");
    }
    stratGame();
};
// on lance la game **************************************************
stratGame();
