$(function () {
    var welcomeSection = $('.welcome-section'),
        enterButton = $('.enter-button'),
        targetUrl = '/index.html';


    setTimeout(function () {
        welcomeSection.removeClass('content-hidden');
    }, 800);


    function fadeOutAndRedirect() {
        welcomeSection.addClass('content-hidden');
        setTimeout(function () {
            window.location.href = targetUrl;
        }, 1000);
    }


    enterButton.on('click', function (e) {
        e.preventDefault();
        fadeOutAndRedirect();
    });


    $(document).on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            fadeOutAndRedirect();
        }
    });
});
