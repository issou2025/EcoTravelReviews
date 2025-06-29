document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuButton.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }

    // --- Set Active Navigation Link ---
    // The HTML should ideally have the "active" class on the correct link on page load.
    // This script is a fallback to ensure the correct link is highlighted.
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Remove existing active class
        link.classList.remove('active');
        // Add active class if paths match
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
    // Manually handle the home page case, as its path is '/'
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        const homeLink = document.querySelector('.nav-menu a[href$="index.html"]');
        if(homeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          homeLink.classList.add('active');
        }
    }


    // --- Smooth Scrolling for Anchor Links ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.error('Invalid selector for anchor link:', targetId);
            }
        });
    });

    // --- Animate Cards on Scroll ---
    const cards = document.querySelectorAll('.review-category-card, .featured-review-card');
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            // Set initial styles for animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            cardObserver.observe(card);
        });
    }
});

// --- Console Welcome Message ---
console.log('🌱 Welcome to EcoTravel Reviews! Happy browsing! 🌱'); 