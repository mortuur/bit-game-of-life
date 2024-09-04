const cellSize = 20;
const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);

const gridElement = document.getElementById('grid');

// Bereken de breedte en hoogte van de container waarin de grid zich bevindt
const gridWidth = gridElement.clientWidth;
const gridHeight = gridElement.clientHeight;

// Bepaal de breedte en hoogte van de cellen op basis van het aantal kolommen en rijen
const cellWidth = gridWidth / cols;
const cellHeight = gridHeight / rows;

// Stel de grid-template kolommen en rijen in op basis van de berekende cellafmetingen
gridElement.style.gridTemplateColumns = `repeat(${cols}, ${cellWidth}px)`;
gridElement.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}px)`;

let grid = Array.from({ length: rows }, () => Array(cols).fill(0));

function createGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => {
                toggleCellState(row, col);
            });
            gridElement.appendChild(cell);
        }
    }
}

function toggleCellState(row, col) {
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    renderGrid();
}

function renderGrid() {
    document.querySelectorAll('.cell').forEach((cell) => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        if (grid[row][col] === 1) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

function toggleGridVisibility() {
    document.getElementById('grid').classList.toggle('grid-hidden');
}
// start game

function startGame() {
    gameRules();
    setInterval(gameRules, 1000);
}

// game rules

function gameRules() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = grid[row][col];
            const neighbors = countNeighbors(row, col);
            if (cell === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    grid[row][col] = 0;
                }
            } else if (neighbors === 3) {
                grid[row][col] = 1;
            }
        }
    }
    renderGrid();
    }

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const x = row + i;
            const y = col + j;
            if (x >= 0 && x < rows && y >= 0 && y < cols && (i !== 0 || j !== 0)) {
                count += grid[x][y];
            }
        }
    }
    return count;
}

function resetGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid[row][col] = 0;
        }
    }
    renderGrid();
}

createGrid();

document.getElementById('toggleGrid').addEventListener('click', toggleGridVisibility);
document.getElementById('togglestart').addEventListener('click', startGame);
