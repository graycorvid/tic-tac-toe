# Tic Tac Toe

A simple [Tic Tac Toe](https://tic-tac-crow.netlify.app/) game built with vanilla JavaScript using the Module Pattern (IIFE) and Factory Functions, created as part of The Odin Project JavaScript curriculum.

---

## Features

- Two-player game with custom names
- Alternating turns (X / O)
- Win detection (all standard winning combinations)
- Tie detection
- Dynamic UI updates (active player highlighting, result display)

## Project Structure

### `gameboard`

Stores the board state as an array of 9 elements.

### `Player` (Factory Function)

Creates player objects containing:

- `name`
- `mark`

### `displayController`

Responsible for DOM manipulation:

- Rendering marks on the board
- Displaying player names
- Highlighting the active player
- Showing the result message
- Activating board interactions

### `game`

Contains the game logic:

- Player initialization
- Turn handling
- Move validation
- Win and tie checking
- Game restart
- Overall game flow control

---

## Future Improvements

- Separate "Rematch" and full "Restart" modes
- Add score tracking
