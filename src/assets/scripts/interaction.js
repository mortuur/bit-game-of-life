document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    let isRunning = false;

    startButton.addEventListener('click', () => {
        isRunning = !isRunning;

        if (isRunning) {
            header.classList.add('hidden');
            footer.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
            footer.classList.remove('hidden');
        }
    });

    // Hover effect to show header when hovering near the top of the screen
    document.addEventListener('mousemove', (event) => {
        if (isRunning) {
            if (event.clientY < 50) {
                header.classList.remove('hidden');
            } else if (event.clientY > window.innerHeight - 50) {
                footer.classList.remove('hidden');
            } else {
                header.classList.add('hidden');
                footer.classList.add('hidden');
            }
        }
    });
});
