document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navbarHeight = document.querySelector('nav').offsetHeight;

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scroll');
    } else {
        navbar.classList.remove('navbar-scroll');
    }
});

DarkReader.setFetchMethod(window.fetch);
DarkReader.enable({
    brightness: 100,
    contrast: 90,
    sepia: 10
});

function toggleDarkMode() {
    if (DarkReader.isEnabled()) {
        DarkReader.disable();
        localStorage.setItem('darkmode', 'disabled');
    } else {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });
        localStorage.setItem('darkmode', 'enabled');
    }
}

window.addEventListener('load', function() {
    if (localStorage.getItem('darkmode') === 'enabled') {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });
    } else {
        DarkReader.disable();
    }

    const darkModeButton = document.createElement('button');
    darkModeButton.innerText = '🌓';
    darkModeButton.classList.add('darkmode-toggle');
    darkModeButton.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeButton);
});


document.getElementById('demoButton').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('demo.html', '_blank', 'width=800,height=600');
});


$(document).ready(function(){
    $('.slick-carousel').slick({
        slidesToShow: 5,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2300,
        dots: false,
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
