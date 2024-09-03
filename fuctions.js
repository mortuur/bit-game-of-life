// Grid instellingen
const rows = 20;
const cols = 20;

// Grid-element in de HTML selecteren
const gridElement = document.getElementById('grid');
gridElement.style.gridTemplateColumns = `repeat(${cols}, 20px)`;

// 2D-array om de huidige staat van het grid bij te houden
let grid = Array.from({ length: rows }, () => Array(cols).fill(0));

// Initialiseer grid in de DOM
function createGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            gridElement.appendChild(cell);
        }
    }
}

function toggleCellState(row, col) {
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    renderGrid();
}

// Update het grid op basis van de 2D-array
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

// Voeg klikbare cellen toe
function addCellClickEvent() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.addEventListener('click', () => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            toggleCellState(row, col);
        });
    });
}

// Initialiseer het grid
createGrid();
addCellClickEvent();
