"use strict";
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

const displayController = (() => {})();

function Player(name, mark) {
  return { name, mark };
}

const game = (() => {
  const player1 = Player("User", "X");
  const player2 = Player("Computer", "O");
  let gameCounter = 0;
  let message;
  const placeMark = (position, mark) => {
    gameboard.gameboardArr[position] = mark;
    checkResult();
  };

  const checkBoard = () => {
    let arrX = [];
    let arrO = [];
    gameboard.gameboardArr.map((item, index) => {
      if (item === "X") {
        arrX.push(index);
        console.log(item, index);
      }
    });

    gameboard.gameboardArr.map((item, index) => {
      if (item === "O") {
        arrO.push(index);
        console.log(item, index);
      }
    });
    return { arrX, arrO };
  };

  const checkResult = () => {
    gameCounter++;
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

game.placeMark(0, game.player1.mark); //
game.placeMark(1, game.player2.mark);
game.placeMark(3, game.player1.mark);
game.placeMark(4, game.player2.mark);
game.placeMark(5, game.player1.mark);
game.placeMark(8, game.player2.mark);
game.placeMark(6, game.player1.mark);
console.log(gameboard.gameboardArr);

//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
