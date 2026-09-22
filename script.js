/* =========================================
   Katherine Pillow Portfolio
   Version 1
========================================= */


// -----------------------------------------
// Current year in footer
// -----------------------------------------

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// -----------------------------------------
// Mobile navigation
// -----------------------------------------

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

    });


    // Close mobile menu when a navigation link is selected
    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";

        });

    });

}


// -----------------------------------------
// Add border to navigation after scrolling
// -----------------------------------------

const siteHeader = document.querySelector(".site-header");

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


// -----------------------------------------
// Scroll reveal animation
// -----------------------------------------

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


if (reducedMotion) {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

} else {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

}


// -----------------------------------------
// Highlight active navigation section
// -----------------------------------------

const sections = document.querySelectorAll("main section[id]");

const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();
