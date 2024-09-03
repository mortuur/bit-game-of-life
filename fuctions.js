
const cellSize = 20;
const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);


const gridElement = document.getElementById('grid');
gridElement.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;


let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let intervalId;


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


function addCellClickEvent() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.addEventListener('click', () => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            toggleCellState(row, col);
        });
    });
}


function nextGeneration() {
    const nextGrid = grid.map(arr => [...arr]);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = grid[row][col];
            const neighbors = countNeighbors(row, col);

            if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[row][col] = 0;
            } else if (cell === 0 && neighbors === 3) {
                nextGrid[row][col] = 1;
            }
        }
    }

    grid = nextGrid;
    renderGrid();
}


function countNeighbors(row, col) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = (row + i + rows) % rows;
            const newCol = (col + j + cols) % cols;
            sum += grid[newRow][newCol];
        }
    }
    sum -= grid[row][col];
    return sum;
}


function startSimulation() {
    intervalId = setInterval(nextGeneration, 100);
}


function stopSimulation() {
    clearInterval(intervalId);
}


function resetGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    renderGrid();
}


function randomizeGrid() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0).map(() => Math.random() > 0.7 ? 1 : 0));
    renderGrid();
}


createGrid();
addCellClickEvent();


document.getElementById('start').addEventListener('click', startSimulation);
document.getElementById('stop').addEventListener('click', stopSimulation);
document.getElementById('reset').addEventListener('click', resetGrid);
document.getElementById('randomize').addEventListener('click', randomizeGrid);