const cellSize = 20;
const gridElement = document.getElementById('grid');

function calculateGridSize() {
    const gridWidth = gridElement.clientWidth;
    const gridHeight = gridElement.clientHeight;
    const cols = Math.floor(gridWidth / cellSize);
    const rows = Math.floor(gridHeight / cellSize);
    return { cols, rows };
}

function setupGrid() {
    const { cols, rows } = calculateGridSize();
    gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    createGrid(rows, cols);
}

function createGrid(rows, cols) {
    gridElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => toggleCellState(row, col));
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

setupGrid();
window.addEventListener('resize', setupGrid);

function toggleGridVisibility() {
    document.getElementById('grid').classList.toggle('grid-hidden');
}

window.addEventListener('resize', updateGrid);

updateGrid();
createGrid();

document.getElementById('toggleGrid').addEventListener('click', toggleGridVisibility);

