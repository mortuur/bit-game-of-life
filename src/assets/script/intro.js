$(function () {
    var welcomeSection = $('.welcome-section'),
        enterButton = $('.enter-button'),
        targetUrl = '#'; 

    
    setTimeout(function () {
        welcomeSection.removeClass('content-hidden');
    }, 800);

    
    enterButton.on('click', function (e) {
        e.preventDefault();
        welcomeSection.addClass('content-hidden').fadeOut(function () {
            window.location.href = targetUrl;
        });
    });

    
    $(document).on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            welcomeSection.addClass('content-hidden').fadeOut(function () {
                window.location.href = targetUrl;
            });
        }
    });
});
