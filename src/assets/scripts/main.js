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
    ctx.fillStyle = 'black'; // Zet kleur op zwart voor levende cellen
    ctx.fill();

    activeCells.push([x, y]);
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
    // Verwijder de cel uit activeCells
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
        // Regel 1: Een levende cel met minder dan 2 of meer dan 3 buren sterft
        if (activeNeighbours < 2 || activeNeighbours > 3) {
            killCell(x, y);
        }
        // Regel 2: Een levende cel met 2 of 3 buren blijft leven (doe niets)
    } else {
        // Regel 3: Een dode cel met precies 3 levende buren wordt een levende cel
        if (activeNeighbours === 3) {
            addActiveCell(x, y);
        }
    }
};

const simulateActiveCells = () => {
    // Kopieer actieve cellen om gelijktijdige updates te voorkomen
    const cellsToCheck = [];

    // Voeg alle actieve cellen en hun buurcellen toe aan de lijst om te controleren
    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            cellsToCheck.push([x, y]);
        }
    }

    // Simuleer de regels voor elke cel
    cellsToCheck.forEach(([x, y]) => {
        simulateCell(x, y);
    });
};

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
        killCell(x, y); // Voeg dit toe om levende cellen te kunnen verwijderen met een klik
    }
});

renderGrid();

document.querySelector('#start-button').addEventListener('click', () => {
    setInterval(simulateActiveCells, 500); // Simuleer elke 500 ms
});
