const rows = 20;
const cols = 20;
let grid = [];
let interval;

function createGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    grid = [];
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => toggleCell(row, col));
            container.appendChild(cell);
            grid[row][col] = cell;
        }
    }
}

function toggleCell(row, col) {
    const cell = grid[row][col];
    cell.classList.toggle('alive');
}

function startGame() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
        const newGrid = [];
        for (let row = 0; row < rows; row++) {
            newGrid[row] = [];
            for (let col = 0; col < cols; col++) {
                const isAlive = grid[row][col].classList.contains('alive');
                const neighbors = countAliveNeighbors(row, col);
                if (isAlive && (neighbors === 2 || neighbors === 3)) {
                    newGrid[row][col] = true;
                } else if (!isAlive && neighbors === 3) {
                    newGrid[row][col] = true;
                } else {
                    newGrid[row][col] = false;
                }
            }
        }
        updateGrid(newGrid);
    }, 500);
}

function countAliveNeighbors(row, col) {
    const deltas = [-1, 0, 1];
    let aliveCount = 0;
    deltas.forEach(dr => {
        deltas.forEach(dc => {
            if (dr === 0 && dc === 0) return;
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (grid[newRow][newCol].classList.contains('alive')) {
                    aliveCount++;
                }
            }
        });
    });
    return aliveCount;
}

function updateGrid(newGrid) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (newGrid[row][col]) {
                grid[row][col].classList.add('alive');
            } else {
                grid[row][col].classList.remove('alive');
            }
        }
    }
}

function resetGame() {
    if (interval) clearInterval(interval);
    createGrid();
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('reset-button').addEventListener('click', resetGame);

createGrid();
