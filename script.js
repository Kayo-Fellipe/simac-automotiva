// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation
function showMenu() {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideMenu() {
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', showMenu);
navClose.addEventListener('click', hideMenu);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        hideMenu();
    }
});

// Header scroll effect
function handleScroll() {
    const scrollY = window.pageYOffset;
    
    if (scrollY >= 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleScroll);

// Active navigation link
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Promotional Slider
function initPromoSlider() {
    const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!sliderTrack || !slides.length) return;
    
    let currentSlide = 0;
    let isAnimating = false;
    let autoSlideInterval;
    
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Move slider track
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                nextSlide();
                resetAutoSlide();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                prevSlide();
                resetAutoSlide();
            }
        });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isAnimating && index !== currentSlide) {
                goToSlide(index);
                resetAutoSlide();
            }
        });
    });
    
    // Auto-advance functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto-advance
    startAutoSlide();
    
    // Initialize first slide
    updateSlider();
}

// Enhanced brands carousel with proper responsive behavior
function initBrandsCarousel() {
    const track = document.querySelector('.brands-track');
    const items = document.querySelectorAll('.brand-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !items.length || !dotsContainer) return;

    let currentSlide = 0;
    let itemsPerSlide = getItemsPerSlide();
    let totalSlides = Math.ceil(items.length / itemsPerSlide);
    let isAnimating = false;
    let autoAdvanceInterval;

    // Function to determine items per slide based on screen size
    function getItemsPerSlide() {
        const width = window.innerWidth;
        if (width <= 767) return 2;   // Mobile: 2 items
        if (width <= 1023) return 3;  // Tablet: 3 items
        return 5;                     // Desktop: 5 items
    }

    // Update layout based on screen size
    function updateLayout() {
        const newItemsPerSlide = getItemsPerSlide();
        const newTotalSlides = Math.ceil(items.length / newItemsPerSlide);
        
        if (newItemsPerSlide !== itemsPerSlide || newTotalSlides !== totalSlides) {
            itemsPerSlide = newItemsPerSlide;
            totalSlides = newTotalSlides;
            
            // Update item flex basis
            items.forEach(item => {
                item.style.flex = `0 0 ${100 / itemsPerSlide}%`;
            });
            
            // Recreate dots
            createDots();
            
            // Reset to first slide if current slide is out of bounds
            if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            
            goToSlide(currentSlide);
        }
    }

    // Set initial item widths
    function initializeItems() {
        items.forEach(item => {
            item.style.flex = `0 0 ${100 / itemsPerSlide}%`;
        });
    }

    // Create dots function
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', () => {
                if (!isAnimating) goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        if (isAnimating || slideIndex === currentSlide) return;
        
        isAnimating = true;
        currentSlide = slideIndex;
        const offset = -(slideIndex * 100);
        track.style.transform = `translateX(${offset}%)`;
        updateDots();
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prevIndex);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isAnimating) {
                prevSlide();
                resetAutoAdvance();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isAnimating) {
                nextSlide();
                resetAutoAdvance();
            }
        });
    }

    // Auto advance functionality
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }
    
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoAdvance);
    track.addEventListener('mouseleave', startAutoAdvance);
    
    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateLayout();
        }, 250);
    });
    
    // Initialize everything
    initializeItems();
    createDots();
    startAutoAdvance();
    goToSlide(0);
}

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
        
        console.log('Form submitted:', data);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                padding: 16px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary-color);
                animation: slideInRight 0.3s ease-out;
            }
            .notification.success {
                border-left-color: var(--success-color);
            }
            .notification.error {
                border-left-color: var(--error-color);
            }
            .notification.warning {
                border-left-color: var(--warning-color);
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            .notification-close:hover {
                background-color: var(--bg-secondary);
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
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

// Add animate-on-scroll class to relevant elements
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

// WhatsApp button animation
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if (whatsappBtn) {
        // Show/hide based on scroll
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

// Performance optimization
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

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('Ocorreu um erro inesperado. Por favor, recarregue a página.', 'error');
});

// Intersection Observer for better performance
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize promotional slider
    initPromoSlider();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize brands carousel
    initBrandsCarousel();
    
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
    
    console.log('SIMAC Distribuidora website loaded successfully!');
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}