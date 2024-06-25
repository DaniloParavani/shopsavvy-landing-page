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