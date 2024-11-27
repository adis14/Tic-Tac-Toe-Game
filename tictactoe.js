const board = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const winnerModal = document.getElementById('winnerModal');
const modalMessage = document.querySelector('.modal-message');
const modalRestartBtn = document.querySelector('.modal-restart-btn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    statusText.innerText = `Player ${currentPlayer} wins!`;
    showWinnerPopup(currentPlayer);
  } else if (gameState.every(cell => cell !== '')) {
    statusText.innerText = "It's a draw!";
    showWinnerPopup("No one");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

// Show the modal
function showWinnerPopup(winner) {
  modalMessage.innerText = winner === "No one" ? "It's a Draw!" : `Player ${winner} Wins!`;
  winnerModal.style.display = 'flex'; 
}

// Hide the modal
function closeWinnerPopup() {
  winnerModal.style.display = 'none'; 
}

function restartGame() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.innerText = `Player X's turn`;
  board.forEach(cell => {
    cell.innerText = '';
  });
  closeWinnerPopup(); // Closing of the popup if it is open
}

board.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

modalRestartBtn.addEventListener('click', restartGame);
