document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const btnRegister = document.getElementById('btnRegister');

let currentUrl = window.location.href;

btnRegister.addEventListener('click', () => {
    window.location.href = currentUrl.replace(/\/[^\/]*$/, '') + '/register.html';
})

$(document).ready(function(){
    $('.slick-carousel').slick({
        slidesToShow: 6,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000, // Velocidade do autoplay (ms)
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
