window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

const menuToggle = document.querySelector(".toggle");
const nav = document.querySelector(".nav");



function toggleMenu() {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
};

nav.addEventListener('click', toggleMenu);
menuToggle.addEventListener('click', toggleMenu);