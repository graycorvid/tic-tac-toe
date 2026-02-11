"use strict";
const boardDiv = document.querySelector(".board");
const start = document.querySelector(".start");
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
    let div = document.querySelector(`div.index${index}`);
    div.append(p);
  };
  return { drawMark };
})();

const game = (() => {
  const player1 = Player("User", "X");
  const player2 = Player("Computer", "O");
  let gameCounter = 0;
  let message;
  const placeMark = (position, mark) => {
    if (gameboard.gameboardArr[position] === "") {
      gameboard.gameboardArr[position] = mark;
      gameCounter++;
      checkResult();
      displayController.drawMark(position, mark);
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
        console.log(item, index);
      }

      if (item === "O") {
        arrO.push(index);
        console.log(item, index);
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
      message = "X WINNER";
      console.log("X WINNER");
    } else if (oWinner) {
      message = "O WINNER";
      console.log("O WINNER");
    } else if (gameCounter === 9) {
      message = "NOBODY WON";
      console.log("NOBODY WON");
    }

    return message;
  };

  return { player1, player2, placeMark, checkResult };
})();
