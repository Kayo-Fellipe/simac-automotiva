// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const brandsCarousel = document.getElementById('brands-carousel');

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
        header.style.background = 'rgba(30, 58, 138, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(30, 58, 138, 1)';
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

function initBrandsCarousel() {
  const carousel = document.querySelector('.brands-carousel');
  const track = document.querySelector('.brands-track');
  const items = Array.from(document.querySelectorAll('.brand-item'));
  const dotsContainer = document.getElementById('testimonial-dots');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  if (!carousel || !track || !items.length || !dotsContainer) return;

  let currentSlide = 0;
  let itemsPerSlide = getItemsPerSlide();
  let totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Layout inicial
  track.style.display = 'flex';
  track.style.transition = 'transform .4s ease';
  updateItemWidths();

  // Criar dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `testimonial-dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  createDots();

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateDots();
  }

  // Botões
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide((currentSlide + 1) % totalSlides);
    });
  }

  // Auto play
  let auto = setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 10000);

  carousel.addEventListener('mouseenter', () => clearInterval(auto));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(auto);
    auto = setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 10000);
  });

  // Funções auxiliares
  function getItemsPerSlide() {
    if (window.innerWidth < 600) return 2;   // Mobile
    if (window.innerWidth < 992) return 3;   // Tablet
    return 5;                                // Desktop
  }

  function updateItemWidths() {
    itemsPerSlide = getItemsPerSlide();
    totalSlides = Math.ceil(items.length / itemsPerSlide);
    items.forEach(el => { el.style.flex = `0 0 ${100 / itemsPerSlide}%`; });
    createDots();
    goToSlide(0);
  }

  // Atualizar ao redimensionar
  window.addEventListener('resize', updateItemWidths);
}

document.addEventListener('DOMContentLoaded', initBrandsCarousel);
document.addEventListener("DOMContentLoaded", initBrandsCarousel);

// Contact form handling
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
        '.footer-section',
        '.testimonial-card'
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

// Testimonials auto-scroll
function initTestimonialsScroll() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function highlightTestimonial() {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 10px 25px rgba(30, 58, 138, 0.15)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Highlight testimonials every 3 seconds
    setInterval(highlightTestimonial, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize brands carousel
    initBrandsCarousel();
    
    // Initialize product gallery
    initProductGallery();
    
    // Initialize WhatsApp button
    initWhatsAppButton();
    
    // Initialize testimonials scroll
    initTestimonialsScroll();
    
    // Set up scroll animation listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    animateOnScroll();
    
    console.log('SIMAC Distribuidora website loaded successfully!');
});

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

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}

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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Product Gallery Filter System
function initProductGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Animate out
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Enhanced brands carousel with better performance
function initBrandsCarousel() {
  const track = document.querySelector('.brands-track');
  const items = document.querySelectorAll('.brand-item');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!track || !items.length) return;

  const itemsPerSlide = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 5;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  let currentSlide = 0;
  let isAnimating = false;

  // Clear existing dots
  dotsContainer.innerHTML = '';

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      if (!isAnimating) goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }

  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentSlide = slideIndex;
    const offset = -(slideIndex * 100);
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
    
    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    if (!isAnimating) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(currentSlide);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (!isAnimating) {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }
  });

  // Auto advance with pause on hover
  let autoAdvanceInterval;
  
  function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
      if (!isAnimating) {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
      }
    }, 4000);
  }
  
  function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
  }
  
  // Start auto advance
  startAutoAdvance();
  
  // Pause on hover
  track.addEventListener('mouseenter', stopAutoAdvance);
  track.addEventListener('mouseleave', startAutoAdvance);
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    const newItemsPerSlide = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    if (newItemsPerSlide !== itemsPerSlide) {
      // Reinitialize carousel with new settings
      stopAutoAdvance();
      setTimeout(() => {
        initBrandsCarousel();
      }, 100);
    }
  }, 250));
}