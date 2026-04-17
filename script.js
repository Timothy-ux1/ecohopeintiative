document.addEventListener('DOMContentLoaded', () => {
    
    //  FOOTER YEAR
    // Automatically sets the current year for the copyright notice
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // HERO SLIDER 
    // We wrap this in a check so it doesn't crash on pages without the slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let autoTimer;

    if (slides.length > 0) {
        const goSlide = (n) => {
            // Remove active state from current
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

            // Update index
            currentSlide = n;

            // Add active state to new
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            goSlide((currentSlide + 1) % slides.length);
        };

        const startAuto = () => {
            autoTimer = setInterval(nextSlide, 5000);
        };

        const stopAuto = () => {
            clearInterval(autoTimer);
        };

        // Initialize dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                stopAuto();
                goSlide(i);
                startAuto();
            });
        });

        // Start the rotation
        startAuto();
    }

    // SCROLL REVEAL 
   
    const revealOptions = { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after revealing to save browser resources
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── 4. NAV SCROLL EFFECT ──
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            // Adds a background color after scrolling 60px
            nav.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    // MOBILE HAMBURGER MENU 
   const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

if (menu && menuLinks) {
    menu.addEventListener('click', function() {
        // Toggle the 'X' animation on the button
        menu.classList.toggle('active');
        // Toggle the visibility/slide on the links
        menuLinks.classList.toggle('active');
    });
}

//  FORM SUBMISSION (GLOBAL SCOPE) 

window.handleSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    
    if (btn) {
        const originalText = btn.innerHTML;
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#2d6a4f'; // var(--green)
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    }
};
});