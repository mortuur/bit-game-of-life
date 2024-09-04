const gridElement = document.getElementById('grid');

// Function to calculate the number of rows and columns based on grid container size
function calculateGridSize() {
    const gridWidth = gridElement.clientWidth;
    const gridHeight = gridElement.clientHeight;

    // Calculate number of columns and rows based on the cell size
    const cols = Math.floor(gridWidth / cellSize);
    const rows = Math.floor(gridHeight / cellSize);

    return { cols, rows };
}

// Function to set up the grid
function setupGrid() {
    const { cols, rows } = calculateGridSize();

    // Set the grid-template properties for columns and rows
    gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Create grid cells
    createGrid(rows, cols);
}

// Function to create the grid
function createGrid(rows, cols) {
    gridElement.innerHTML = ''; // Clear any existing cells

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

// Function to toggle the state of a cell
function toggleCellState(row, col) {
    grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    renderGrid();
}

// Function to render the grid
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

// Initial setup
setupGrid();

// Add event listener to handle window resize
window.addEventListener('resize', setupGrid);

// Toggle grid visibility button
document.getElementById('toggleGrid').addEventListener('click', toggleGridVisibility);
