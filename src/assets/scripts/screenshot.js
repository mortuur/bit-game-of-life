document.addEventListener('DOMContentLoaded', function () {
    const cameraButton = document.querySelector('#draggable-menu .nav-content span:nth-child(2) a');
    const modal = document.getElementById('screenshot-modal');
    const closeModal = document.querySelector('#screenshot-modal .close');
    const saveGalleryBtn = document.getElementById('save-gallery');
    const discardBtn = document.getElementById('discard');
    const downloadBtn = document.getElementById('download');
    const descriptionInput = document.getElementById('image-description');
    let capturedImage;

    cameraButton.addEventListener('click', function () {

        document.getElementById('draggable-menu').style.display = 'none';
        document.querySelector('footer').style.display = 'none';

        html2canvas(document.body, {
            useCORS: true,
            logging: false,
            scale: 1,
            backgroundColor: null,
            ignoreElements: (element) => element.id === 'draggable-menu' || element.tagName === 'FOOTER'
        }).then(function (canvas) {
            capturedImage = canvas.toDataURL('image/png');
            showModal();
        }).catch(function (error) {
            console.error('Screenshot capture failed:', error);
        }).finally(function () {

            document.getElementById('draggable-menu').style.display = 'flex';
            document.querySelector('footer').style.display = 'flex';
        });
    });

    function showModal() {
        modal.classList.remove('hidden');
        modal.querySelector('img').src = capturedImage;
    }

    closeModal.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    saveGalleryBtn.addEventListener('click', function () {
        const description = descriptionInput.value;
        if (description) {
            let gallery = JSON.parse(localStorage.getItem('gallery')) || [];
            gallery.push({ image: capturedImage, description: description });
            localStorage.setItem('gallery', JSON.stringify(gallery));


            alert('Image saved to gallery successfully!');
        }
    });

    discardBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
    });

    downloadBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = capturedImage;
        link.download = 'screenshot.png';
        link.click();
    });
});
