document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    document.addEventListener('mousemove', (event) => {
        
        if (event.clientY < 50) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        } else {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        }

        if (event.clientY > window.innerHeight - 50) {
            footer.style.transform = 'translateY(0)';
            footer.style.opacity = '1';
        } else {
            footer.style.transform = 'translateY(100%)';
            footer.style.opacity = '0';
        }
    });
});
