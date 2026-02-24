"use strict";
let gameStarted = false;
let currentPlayer = 1;
const boardDiv = document.querySelector(".board");
const start = document.querySelector(".start");
const result = document.querySelector(".result");
const messagePara = document.querySelector(".message");
const playerOneInput = document.querySelector("input.player1");
const playerTwoInput = document.querySelector("input.player2");
const playerOneDisplay = document.querySelector("h2.player1");
const playerTwoDisplay = document.querySelector("h2.player2");
const form = document.querySelector("form");
const footer = document.querySelector("footer");
const gameboard = (() => {
  return {
    gameboardArr: ["", "", "", "", "", "", "", "", ""],
  };
})();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Player(name, mark) {
  return { name, mark };
}

const displayController = (() => {
  const drawMark = (index, mark) => {
    let p = document.createElement("p");
    p.innerText = mark;
    p.classList.add(mark === "X" ? "xmark" : "omark");
    let div = document.querySelector(`div[data-id="${index}"]`);
    div.append(p);
  };

  const showPlayers = (name1, name2) => {
    playerOneInput.disabled = true;
    playerTwoInput.disabled = true;
    playerOneDisplay.innerText = name1;
    playerTwoDisplay.innerText = name2;
    playerOneDisplay.classList.add("one", "xactive", "active");
    playerTwoDisplay.classList.add("two");

    start.innerText = "Restart";
  };

  const activateBoard = () => {
    boardDiv.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("mark")) {
        e.target.classList.add("mark-active");
      }
    });
    boardDiv.addEventListener("mouseout", (e) => {
      if (e.target.classList.contains("mark")) {
        e.target.classList.remove("mark-active");
      }
    });
    boardDiv.addEventListener("click", (e) => {
      game.placeMark(e.target.dataset.id);
    });
  };

  const changePlayerUI = () => {
    if (currentPlayer === 1) {
      document.querySelector(".one").classList.add("xactive", "active");
      document.querySelector(".two").classList.remove("oactive", "active");
    } else {
      document.querySelector(".two").classList.add("oactive", "active");
      document.querySelector(".one").classList.remove("xactive", "active");
    }
  };
  return { drawMark, showPlayers, activateBoard, changePlayerUI };
})();

const game = (() => {
  let gameCounter = 0;
  let message;
  let player1;
  let player2;
  let mark;

  const gameController = () => {
    if (!gameStarted) {
      initiatePlayers();
      gameStarted = true;
    } else {
      restartGame();
    }
  };

  const initiatePlayers = () => {
    const name1 = playerOneInput.value;
    const name2 = playerTwoInput.value;

    if (name1 && name2) {
      game.setPlayers(name1, name2);
      if (!gameStarted) {
        displayController.showPlayers(name1, name2);
        displayController.activateBoard();
      }
    }
  };
  const setPlayers = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
  };

  const placeMark = (position) => {
    mark = currentPlayer === 1 ? player1.mark : player2.mark;
    if (gameboard.gameboardArr[position] === "") {
      gameboard.gameboardArr[position] = mark;
      gameCounter++;
      checkResult();
      displayController.drawMark(position, mark);
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      displayController.changePlayerUI();
    } else {
      console.log("Spot already taken!");
    }
  };

  const checkBoard = () => {
    let arrX = [];
    let arrO = [];
    gameboard.gameboardArr.forEach((item, index) => {
      if (item === "X") {
        arrX.push(index);
      }

      if (item === "O") {
        arrO.push(index);
      }
    });

    return { arrX, arrO };
  };

  const checkResult = () => {
    let { arrX, arrO } = checkBoard();

    const xWinner = winningCombos.some((combination) => {
      return combination.every((index) => {
        return arrX.includes(index);
      });
    });
    const oWinner = winningCombos.some((combination) => {
      return combination.every((index) => arrO.includes(index));
    });

    if (xWinner) {
      message = `WINNER: ${player1.name} 🏆`;
      showWinner(message);
    } else if (oWinner) {
      message = `WINNER: ${player2.name} 🏆`;
      showWinner(message);
    } else if (gameCounter === 9) {
      message = "IT'S A TIE";
      showWinner(message);
    }

    return message;
  };

  const showWinner = (winner) => {
    result.classList.remove("hidden");
    messagePara.innerText = winner;
  };
  const restartGame = () => {
    gameStarted = false;
    document.querySelectorAll(".board p").forEach((p) => p.remove());
    gameboard.gameboardArr = ["", "", "", "", "", "", "", "", ""];
    message = "";
    result.classList.add("hidden");
    gameCounter = 0;
    currentPlayer = 1;
    displayController.changePlayerUI();
  };

  return {
    placeMark,
    checkResult,
    setPlayers,
    gameController,
  };
})();

start.addEventListener("click", game.gameController);
