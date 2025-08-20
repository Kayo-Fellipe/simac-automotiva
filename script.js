// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('products-grid');

// Sample products data
const products = [
    {
        id: 1,
        name: 'Shell Helix Ultra 5W-30',
        description: 'Óleo sintético premium para motores modernos com máxima proteção.',
        price: 'R$ 89,90',
        category: 'shell',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Sintético'
    },
    {
        id: 2,
        name: 'ACDelco Dexron VI',
        description: 'Fluido para transmissão automática de alta performance e durabilidade.',
        price: 'R$ 45,90',
        category: 'acdelco',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Original'
    },
    {
        id: 3,
        name: 'Motorlub Super 20W-50',
        description: 'Óleo mineral de alta qualidade para motores convencionais.',
        price: 'R$ 32,90',
        category: 'motorlub',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Mineral'
    },
    {
        id: 4,
        name: 'Idemitsu 0W-20',
        description: 'Óleo sintético japonês de baixa viscosidade para economia de combustível.',
        price: 'R$ 95,90',
        category: 'idemitsu',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Japonês'
    },
    {
        id: 5,
        name: 'Shell Rimula R6 LM 10W-40',
        description: 'Óleo diesel sintético para caminhões e veículos pesados.',
        price: 'R$ 125,90',
        category: 'shell',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Diesel'
    },
    {
        id: 6,
        name: 'ACDelco DOT 4',
        description: 'Fluido de freio de alta performance para sistemas de freio modernos.',
        price: 'R$ 28,90',
        category: 'acdelco',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'DOT 4'
    },
    {
        id: 7,
        name: 'Motorlub Gear 85W-140',
        description: 'Óleo para diferencial e caixa de câmbio manual de alta viscosidade.',
        price: 'R$ 38,90',
        category: 'motorlub',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Diferencial'
    },
    {
        id: 8,
        name: 'Idemitsu CVT',
        description: 'Fluido especial para transmissões continuamente variáveis (CVT).',
        price: 'R$ 78,90',
        category: 'idemitsu',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'CVT'
    },
    {
        id: 9,
        name: 'Valvoline MaxLife 10W-40',
        description: 'Óleo semissintético especial para veículos com alta quilometragem.',
        price: 'R$ 52,90',
        category: 'outras',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Alta Km'
    },
    {
        id: 10,
        name: 'Shell Advance AX7 10W-40',
        description: 'Óleo para motocicletas 4 tempos com tecnologia avançada.',
        price: 'R$ 42,90',
        category: 'shell',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Moto'
    },
    {
        id: 11,
        name: 'ACDelco Arla 32',
        description: 'Solução de ureia para sistemas SCR de veículos diesel Euro V.',
        price: 'R$ 15,90',
        category: 'acdelco',
        image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Arla 32'
    },
    {
        id: 12,
        name: 'Motorlub Hidráulico 68',
        description: 'Óleo hidráulico para sistemas de direção hidráulica e equipamentos.',
        price: 'R$ 35,90',
        category: 'motorlub',
        image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Hidráulico'
    }
];

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
        header.style.background = 'rgba(255, 255, 255, 0.95)';
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

// Product filtering
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation delay
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
            card.classList.add('fade-in-up');
        });
    }, 100);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = `product-card ${product.category}`;
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
            <div class="product-actions">
                <button class="btn btn-primary btn-small" onclick="addToCart(${product.id})">
                    Comprar
                </button>
                <button class="btn btn-secondary btn-small" onclick="showProductDetails(${product.id})">
                    Detalhes
                </button>
            </div>
        </div>
    `;
    return card;
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
                card.classList.add('fade-in');
            }, 50);
        } else {
            card.classList.add('hidden');
        }
    });
}

// Filter button event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter products
        const category = button.getAttribute('data-filter');
        filterProducts(category);
    });
});

// Product actions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Simulate adding to cart
        showNotification(`${product.name} adicionado ao carrinho!`, 'success');
        
        // Here you would typically add the product to a cart state/localStorage
        console.log('Product added to cart:', product);
    }
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Simulate showing product details modal
        showNotification(`Detalhes de ${product.name}`, 'info');
        
        // Here you would typically open a modal or navigate to product page
        console.log('Show product details:', product);
    }
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
        '.service-card',
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render initial products
    renderProducts();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Set up scroll animation listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial animation check
    animateOnScroll();
    
    console.log('Sima Automotiva website loaded successfully!');
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