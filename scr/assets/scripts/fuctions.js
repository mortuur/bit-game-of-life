/**
 * Creates a 2D array of size rows x cols filled with zeros.
 * @param {number} rows - The number of rows in the array.
 * @param {number} cols - The number of columns in the array.
 * @returns {Array<Array<number>>} - The created 2D array.
 */
function make2dArray(rows, cols) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = Array(cols).fill(0);
    }
    return arr;
}

let grid;
const rows = 20;
const cols = 20;
const cellSize = 20;

/**
 * Initializes the canvas and the grid.
 * The canvas is set to 400 by 400 pixels, and the grid is set to 20 by 20 cells.
 * The grid is then populated with random alive or dead cells.
 */
function setup() {
    const canvas = createCanvas(cols * cellSize, rows * cellSize);
    canvas.parent('game-of-life');
    grid = make2dArray(rows, cols);
    randomizeGrid();
}

/**
 * Populates the grid with random alive or dead cells.
 */
function randomizeGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

/**
 * Draws the grid on the canvas.
 */
function draw() {
    background(0);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            fill(grid[i][j] === 1 ? 255 : 0);
            rect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

/**
 * Toggles the cell at the given position.
 * @param {number} x - The x-coordinate in pixels.
 * @param {number} y - The y-coordinate in pixels.
 */
function toggleCellAtPosition(x, y) {
    let col = floor(x / cellSize);
    let row = floor(y / cellSize);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = grid[row][col] ? 0 : 1;
    }
}

// Handle all mouse interactions with one function.
function mousePressed() {
    toggleCellAtPosition(mouseX, mouseY);
}

/**
 * Resets the grid when the spacebar is pressed.
 */
function keyPressed() {
    if (key === ' ') {
        randomizeGrid();
    }
}

