// navbar show when user scrolls up
const navbar = document.querySelector('nav')

lastScrollTop = 0;
scrollabc = 80;

window.addEventListener("scroll", function () {
    var currentScrollTop = $(this).scrollTop();
    if (currentScrollTop == 0) {
        navbar.classList.remove("show-nav");
        navbar.classList.remove("hidden-nav")
    }
    // console.log(window.pageYOffset);
    if (currentScrollTop > scrollabc) {
        if (currentScrollTop > lastScrollTop) {
            navbar.classList.remove("show-nav");
            navbar.classList.add("hidden-nav");
        }
        else {
            navbar.classList.add("show-nav");
            navbar.classList.remove("hidden-nav");
        }
    }
    lastScrollTop = currentScrollTop;

});