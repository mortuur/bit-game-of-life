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
            console.log((row + col).toString());
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

// function toggleCellState(row, col) {
//     grid[row][col] = grid[row][col] === 0 ? 1 : 0;
//     renderGrid();
// }

function start() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 1) {
                checkCellState(row, col);
                // setInterval(start, 100);
            }
        }
    }
}

function toggleCellState(row, col) {
    const cellElement = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`,
    );
    cellElement.classList.toggle('alive');
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
}

/**
 * Controleert de buurcellen van een cel en past de regels van Conway's Game of Life toe.
 * @param {number} row - De rij van de cel.
 * @param {number} col - De kolom van de cel.
 */
function checkCellState(row, col) {
    const neighbors = [
        // checkt boven
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row - 1, col],
        // check midden
        [row, col - 1],
        [row, col + 1],
        // check onder
        [row + 1, col - 1],
        [row + 1, col + 1],
        [row + 1, col],
    ];

    let aliveNeighbors = 0;

    for (const neighbor of neighbors) {
        if (grid[neighbor[0]][neighbor[1]] === 1) {
            aliveNeighbors++;
        }
    }

    if (aliveNeighbors < 2) {
        toggleCellState(row, col);
        return;
    }

    if (aliveNeighborsi === 3) {
        console.log('alive');
        toggleCellState(row, col);
    }
}

function toggleGridVisibility() {
    document.getElementById('grid').classList.toggle('grid-hidden');
}

createGrid();

document
    .getElementById('toggleGrid')
    .addEventListener('click', toggleGridVisibility);
document.getElementById('start').addEventListener('click', start);
