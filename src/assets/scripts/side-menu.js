document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.querySelector('.side-menu');
    const toggleButton = document.querySelector('.menu-toggle');

    document.addEventListener('mousemove', (event) => {
        if (event.clientX < 50) {
            sideMenu.classList.add('open');
        } else if (event.clientX > 250) {
            sideMenu.classList.remove('open');
        }
    });

    sideMenu.addEventListener('mouseleave', () => {
        if (sideMenu.classList.contains('open')) {
            sideMenu.classList.remove('open');
        }
    });

const modal = document.getElementById('explanation-modal');
const closeModal = document.querySelector('.close');
const openModalButton = document.getElementById('open-modal');

openModalButton.addEventListener('click', () => {
    modal.classList.add('open');
    
    modal.querySelector('.modal-content').focus();
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('open');
    }
});

modal.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        const focusableElements = modal.querySelectorAll('a, button, input, textarea, select');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            
            if (document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
});

    const colorPicker = document.getElementById('color-picker');
    colorPicker.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (cell.classList.contains('alive')) {
                cell.style.backgroundColor = selectedColor;
            }
        });
    });
});
