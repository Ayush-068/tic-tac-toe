const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Start a new game
function startNewGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto'; // Enable clicking
    });
}

// Check if there's a winner
function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] || !isGameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        alert(`${winner} wins!`);
        isGameActive = false;
        return;
    }

    // Check for draw
    if (!gameState.includes('')) {
        alert("It's a draw!");
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

// Add event listeners to cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Restart the game
restartButton.addEventListener('click', startNewGame);

startNewGame(); // Initialize the game
