const canvas = document.querySelector('#main-canvas');
canvas.width = Math.floor(window.innerWidth);
canvas.height = Math.floor(window.innerHeight);

const ctx = canvas.getContext('2d');

const CELL_SIZE = 20;

const MAX_X = Math.round(canvas.width / CELL_SIZE);
const MAX_Y = Math.round(canvas.height / CELL_SIZE);

const activeCells = [];

const addActiveCell = (x, y) => {
    ctx.beginPath();
    ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.fillStyle = 'black'; // Zwarte kleur voor actieve cellen
    ctx.fill();

    activeCells.push([x, y]);
};

const drawInvisibleCell = (x, y) => {
    ctx.beginPath();
    ctx.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.fillStyle = 'white'; // Kleur voor dode cellen
    ctx.fill();
};

const drawEmptyCell = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = 'lightgray';
    ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.fillStyle = 'white'; // Kleur voor dode cellen
    ctx.fill();
};

const killCell = (x, y) => {
    ctx.clearRect(CELL_SIZE * x, CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
    drawEmptyCell(x, y);
    const index = activeCells.findIndex(
        (cell) => cell[0] === x && cell[1] === y,
    );
    if (index > -1) activeCells.splice(index, 1);
};

const renderGrid = () => {
    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            drawEmptyCell(x, y);
        }
    }
};

const isCellActive = (x, y) =>
    activeCells.some((cell) => cell[0] === x && cell[1] === y);

const simulateCell = (x, y) => {
    const NEIGHBOUR_OFFSETS = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    let activeNeighbours = 0;

    for (const offset of NEIGHBOUR_OFFSETS) {
        const neighbourX = x + offset[0];
        const neighbourY = y + offset[1];

        if (
            neighbourX >= 0 &&
            neighbourX < MAX_X &&
            neighbourY >= 0 &&
            neighbourY < MAX_Y
        ) {
            if (isCellActive(neighbourX, neighbourY)) {
                activeNeighbours++;
            }
        }
    }

    if (isCellActive(x, y)) {
        if (activeNeighbours < 2 || activeNeighbours > 3) {
            killCell(x, y);
        }
    } else {
        if (activeNeighbours === 3) {
            addActiveCell(x, y);
        }
    }
};

const simulateActiveCells = () => {
    const cellsToCheck = [];

    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            cellsToCheck.push([x, y]);
        }
    }

    cellsToCheck.forEach(([x, y]) => {
        simulateCell(x, y);
    });
};

const getResult = (x, y) => x + y;


// Functie om een willekeurige startconfiguratie (random miezer) te genereren
const randomMiezer = (percentage = 0.2) => {
    renderGrid();
    activeCells.length = 0; // Leeg de lijst van actieve cellen

    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            if (Math.random() < percentage) {
                addActiveCell(x, y); // Actieve cel toevoegen met bepaalde kans
            }
        }
    }
};

const clearLines = () => {
    console.log('test');
    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            if (isCellActive(x, y)) continue;
            drawInvisibleCell(x, y);
        }
    }
};
const resetLine = (y) => {
    for (let x = 0; x < MAX_X; x++) {
        if (!isCellActive(x, y)) {
            drawCell(x, y); // Teken de cel opnieuw
        }
    }
};

console.log('k');

window.addEventListener('mousedown', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (mouseX > canvas.width || mouseY > canvas.height) {
        return;
    }

    const [x, y] = [
        Math.floor(mouseX / CELL_SIZE),
        Math.floor(mouseY / CELL_SIZE),
    ];

    if (!isCellActive(x, y)) {
        addActiveCell(x, y);
    } else {
        killCell(x, y); // Mogelijkheid om cellen te verwijderen
    }
});

renderGrid();

// Start knop voor de simulatie
document.querySelector('#start').addEventListener('click', () => {
    setInterval(simulateActiveCells, 200); // Simuleer elke 500 ms
});

// Knop voor willekeurige startconfiguratie (random miezer)
document.querySelector('#randomize').addEventListener('click', () => {
    randomMiezer(0.3); // Willekeurig 30% van de cellen activeren
});
document.querySelector('#toggleGrid').addEventListener('click', () => {
    clearLines(); // Willekeurig 30% van de cellen activeren
});

document.querySelector('#stop').addEventListener('click', () => {
    randomMiezer(0.3); // Willekeurig 30% van de cellen activeren
});

