
const nav = document.getElementById('draggable-menu');
const toggleBtn = nav.querySelector(".toggle-btn");
let musicPlaying = false;
const musicIcon = document.getElementById('music-icon');

const music = document.getElementById('background-music');

let isDragging = false;
let startX, startY, initialTop, initialLeft;

toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

function onDrag(e) {
    if (!isDragging) return;

    const newTop = initialTop + e.clientY - startY;
    const newLeft = initialLeft + e.clientX - startX;

    nav.style.top = `${newTop}px`;
    nav.style.left = `${newLeft}px`;
}

nav.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const navStyle = window.getComputedStyle(nav);
    initialTop = parseInt(navStyle.top);
    initialLeft = parseInt(navStyle.left);

    document.body.style.userSelect = 'none';
});

document.addEventListener("mousemove", onDrag);

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = ''; 
});

document.addEventListener("mouseleave", () => {
    isDragging = false;
    document.body.style.userSelect = ''; 
});

const musicButton = document.getElementById('music-button');
musicButton.addEventListener('click', () => {
    if (musicPlaying) {
        
        music.pause();
        musicIcon.classList.replace('bx-pause-circle', 'bx-play-circle');
        musicPlaying = false;
    } else {
        
        music.play();
        musicIcon.classList.replace('bx-play-circle', 'bx-pause-circle');
        musicPlaying = true;
    }
});
