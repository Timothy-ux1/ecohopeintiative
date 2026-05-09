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

    // STORY CARD READ MORE FUNCTIONALITY
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        const texts = card.querySelectorAll('.story-text[data-truncate="true"]');
        
        if (texts.length > 0) {
            // Show only first paragraph initially
            texts[0].classList.add('visible');
            
            // Create and add read more button
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Read More';
            let isExpanded = false;
            
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                isExpanded = !isExpanded;
                
                texts.forEach(text => {
                    if (isExpanded) {
                        text.classList.add('visible');
                    } else {
                        if (text !== texts[0]) {
                            text.classList.remove('visible');
                        }
                    }
                });
                
                readMoreBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
            });
            
            // Insert button after story content
            const storyContent = card.querySelector('.story-content');
            if (storyContent) {
                storyContent.appendChild(readMoreBtn);
            }
        }
    });

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
/* ── YouTube Video Cards – click to play inline ── */
document.querySelectorAll('.video-card').forEach(function(card) {
  card.addEventListener('click', function() {
    var videoId = card.getAttribute('data-video-id');
    if (!videoId || videoId === 'VIDEO_ID_HERE') return;

    var thumb = card.querySelector('.video-thumb');

    /* Remove existing thumbnail image and play button */
    thumb.innerHTML = '';

    /* Insert iframe that autoplays */
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('title', card.querySelector('.video-title') ? card.querySelector('.video-title').textContent : 'ECO-HOPE Video');
    thumb.appendChild(iframe);

    /* Remove click cursor once playing */
    card.style.cursor = 'default';
  });
});
(function () {
  var cards = document.querySelectorAll('.programs-grid .program-card-image');

  // Hide cards 4–9
  cards.forEach(function (card, i) {
    if (i >= 3) card.classList.add('prog-hidden');
  });

  // Add the toggle button after the grid
  var grid = document.querySelector('.programs-grid');
  if (!grid) return;

  var wrap = document.createElement('div');
  wrap.className = 'prog-toggle-wrap';
  grid.insertAdjacentElement('afterend', wrap);

  var btn = document.createElement('button');
  btn.className = 'prog-toggle-btn';
  btn.id = 'progToggleBtn';
  wrap.appendChild(btn);

  var open = false;

  function updateBtn() {
    btn.innerHTML = (open ? 'Show Fewer Programs' : 'Show More Programs')
      + ' <span style="display:inline-block;transition:transform 0.3s ease;transform:'
      + (open ? 'rotate(180deg)' : 'rotate(0deg)') + '">&#9660;</span>';
  }

  btn.addEventListener('click', function () {
    open = !open;
    cards.forEach(function (card, i) {
      if (i >= 3) card.classList.toggle('prog-hidden', !open);
    });
    updateBtn();
  });

  updateBtn();
})();