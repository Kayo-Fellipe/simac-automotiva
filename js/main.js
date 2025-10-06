/**
 * SIMAC - Main JavaScript
 * Shared functionality across all pages
 */

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// ======================
// Mobile Navigation
// ======================

function showMenu() {
    if (navMenu) {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (navToggle) {
    navToggle.addEventListener('click', showMenu);
}

if (navClose) {
    navClose.addEventListener('click', hideMenu);
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        navToggle && !navToggle.contains(e.target)) {
        hideMenu();
    }
});

// ======================
// Header Scroll Effect
// ======================

function handleScroll() {
    if (!header) return;

    const scrollY = window.pageYOffset;

    if (scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ======================
// Active Navigation Link
// ======================

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href*="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ======================
// Smooth Scrolling
// ======================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======================
// Image Lazy Loading
// ======================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Set src from data-src if available
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }

                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
        });
    }
}

// ======================
// Toast Notifications
// ======================

function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    document.body.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);

    return toast;
}

// ======================
// Form Validation Helpers
// ======================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && re.test(phone);
}

function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    // Remove existing error
    const existingError = formGroup.querySelector('.form-error');
    if (existingError) existingError.remove();

    // Add new error
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    formGroup.appendChild(error);

    input.classList.add('error');
}

function clearFieldError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const error = formGroup.querySelector('.form-error');
    if (error) error.remove();

    input.classList.remove('error');
}

// ======================
// Scroll Animations
// ======================

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

function initScrollAnimations() {
    const elementsToAnimate = [
        '.section-header',
        '.advantage-card',
        '.product-item',
        '.about-text',
        '.stat',
        '.contact-item',
        '.footer-section'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
}

// ======================
// WhatsApp Button
// ======================

function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');

    if (whatsappBtn) {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.visibility = 'hidden';

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.visibility = 'visible';
            } else {
                whatsappBtn.style.opacity = '0';
                whatsappBtn.style.visibility = 'hidden';
            }
        });
    }
}

// ======================
// Performance Optimization
// ======================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    handleScroll();
    updateActiveLink();
    animateOnScroll();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ======================
// Error Handling
// ======================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ======================
// Intersection Observer for Animations
// ======================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// ======================
// Initialization
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    initLazyLoading();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize WhatsApp button
    initWhatsAppButton();

    // Set up scroll animation listener
    window.addEventListener('scroll', animateOnScroll);

    // Trigger initial animation check
    animateOnScroll();

    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    console.log('SIMAC website loaded successfully!');
});

// Export utilities for use in other scripts
window.SIMAC = {
    showToast,
    validateEmail,
    validatePhone,
    showFieldError,
    clearFieldError,
    debounce
};
