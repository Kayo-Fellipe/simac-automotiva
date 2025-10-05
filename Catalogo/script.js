// Elementos DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const sortSelect = document.getElementById('sortSelect');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const clearFiltersBtn = document.getElementById('clearFilters');
const brandFilters = document.getElementById('brandFilters');
const categoryFilters = document.getElementById('categoryFilters');
const availabilityAll = document.getElementById('availabilityAll');
const availabilityInStock = document.getElementById('availabilityInStock');
const availabilitySpecialOrder = document.getElementById('availabilitySpecialOrder');

// Estado da aplicação
let currentProducts = [...productsData];
let filteredProducts = [...productsData];

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    displayProducts(currentProducts);
    setupEventListeners();
    hideLoading();
    initMobileMenu();
    duplicateBrandsForCarousel();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Duplicate brands for infinite carousel effect
function duplicateBrandsForCarousel() {
    const brandsTrack = document.querySelector('.brands-track');
    if (brandsTrack) {
        const brandItems = brandsTrack.innerHTML;
        brandsTrack.innerHTML = brandItems + brandItems;
    }
}

// Inicializar opções de filtro
function initializeFilters() {
    // Obter marcas e categorias únicas
    const brands = [...new Set(productsData.map(product => product.brand))].sort();
    const categories = [...new Set(productsData.map(product => product.category))].sort();

    // Popular filtros de marca
    brands.forEach(brand => {
        const label = document.createElement('label');
        label.className = 'filter-option';
        label.innerHTML = `
            <input type="checkbox" value="${brand}">
            <span class="checkmark"></span>
            ${brand}
        `;
        brandFilters.appendChild(label);
    });

    // Popular filtros de categoria
    categories.forEach(category => {
        const label = document.createElement('label');
        label.className = 'filter-option';
        label.innerHTML = `
            <input type="checkbox" value="${category}">
            <span class="checkmark"></span>
            ${category}
        `;
        categoryFilters.appendChild(label);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Funcionalidade de busca
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);
    
    // Funcionalidade de ordenação
    sortSelect.addEventListener('change', handleSort);
    
    // Funcionalidade de filtro
    brandFilters.addEventListener('change', handleFilters);
    categoryFilters.addEventListener('change', handleFilters);
    availabilityAll.addEventListener('change', handleAvailabilityFilter);
    availabilityInStock.addEventListener('change', handleAvailabilityFilter);
    availabilitySpecialOrder.addEventListener('change', handleAvailabilityFilter);
    
    // Limpar filtros
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Gerenciar funcionalidade de busca
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredProducts = [...currentProducts];
    } else {
        filteredProducts = currentProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.partNumber.toLowerCase().includes(query) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    }
    
    displayProducts(filteredProducts);
}

// Gerenciar ordenação
function handleSort() {
    const sortBy = sortSelect.value;
    
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'brand':
                return a.brand.localeCompare(b.brand);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
    
    displayProducts(filteredProducts);
}

// Gerenciar filtros
function handleFilters() {
    const selectedBrands = getSelectedFilterValues(brandFilters);
    const selectedCategories = getSelectedFilterValues(categoryFilters);
    const selectedAvailability = getSelectedAvailability();
    
    currentProducts = productsData.filter(product => {
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes('all') || selectedBrands.includes(product.brand);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes('all') || selectedCategories.includes(product.category);
        const availabilityMatch = selectedAvailability.length === 0 || selectedAvailability.includes('all') || selectedAvailability.includes(product.availability);
        
        return brandMatch && categoryMatch && availabilityMatch;
    });
    
    // Reaplicar busca se houver uma consulta de busca
    if (searchInput.value.trim() !== '') {
        handleSearch();
    } else {
        filteredProducts = [...currentProducts];
        displayProducts(filteredProducts);
    }
}

// Gerenciar filtro de disponibilidade
function handleAvailabilityFilter() {
    // Garantir que apenas uma opção de disponibilidade seja selecionada por vez
    if (availabilityAll.checked) {
        availabilityInStock.checked = false;
        availabilitySpecialOrder.checked = false;
    } else if (availabilityInStock.checked || availabilitySpecialOrder.checked) {
        availabilityAll.checked = false;
    }
    
    handleFilters();
}

// Obter valores de filtro selecionados
function getSelectedFilterValues(container) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Obter opções de disponibilidade selecionadas
function getSelectedAvailability() {
    const selected = [];
    if (availabilityAll.checked) selected.push('all');
    if (availabilityInStock.checked) selected.push('in-stock');
    if (availabilitySpecialOrder.checked) selected.push('special-order');
    return selected;
}

// Limpar todos os filtros
function clearAllFilters() {
    // Limpar busca
    searchInput.value = '';
    
    // Resetar todas as checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    
    // Resetar ordenação
    sortSelect.value = 'name';
    
    // Resetar dados
    currentProducts = [...productsData];
    filteredProducts = [...productsData];
    
    displayProducts(filteredProducts);
}

// Exibir produtos na grade
function displayProducts(products) {
    showLoading();
    
    // Simular delay de carregamento para melhor UX
    setTimeout(() => {
        if (products.length === 0) {
            showNoResults();
        } else {
            hideNoResults();
            renderProducts(products);
        }
        
        updateResultsCount(products.length);
        hideLoading();
    }, 300);
}

// Renderizar produtos no DOM
function renderProducts(products) {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Criar um elemento de cartão de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const availabilityClass = product.availability === 'in-stock' ? 'in-stock' : 
                            product.availability === 'special-order' ? 'special-order' : 'out-of-stock';
    
    const availabilityText = product.availability === 'in-stock' ? 'Em Estoque' :
                           product.availability === 'special-order' ? 'Pedido Especial' : 'Fora de Estoque';
    
    card.innerHTML = `
        <div class="product-header">
            <span class="product-brand">${product.brand}</span>
            <span class="availability-badge ${availabilityClass}">${availabilityText}</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-details">
            <p><strong>Código:</strong> ${product.partNumber}</p>
            ${product.viscosity ? `<p><strong>Viscosidade:</strong> ${product.viscosity}</p>` : ''}
            ${product.volume ? `<p><strong>Volume:</strong> ${product.volume}</p>` : ''}
            ${product.nlgiGrade ? `<p><strong>Grau NLGI:</strong> ${product.nlgiGrade}</p>` : ''}
            <p><strong>Descrição:</strong> ${product.description}</p>
        </div>
        <div class="product-actions">
            <button class="btn btn-primary" onclick="checkAvailability('${product.partNumber}')">
                Verificar Disponibilidade
            </button>
            <button class="btn btn-secondary" onclick="requestQuote('${product.partNumber}')">
                Solicitar Cotação
            </button>
        </div>
    `;
    
    return card;
}

// Atualizar contagem de resultados
function updateResultsCount(count) {
    resultsCount.textContent = `${count} produto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
}

// Funções de estado de carregamento
function showLoading() {
    loading.style.display = 'block';
    productsGrid.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
    productsGrid.style.display = 'grid';
}

function showNoResults() {
    noResults.style.display = 'block';
    productsGrid.style.display = 'none';
}

function hideNoResults() {
    noResults.style.display = 'none';
    productsGrid.style.display = 'grid';
}

// Funções de ação do produto
function checkAvailability(partNumber) {
    const product = productsData.find(p => p.partNumber === partNumber);
    if (product) {
        let message = `Produto: ${product.name}\nCódigo: ${partNumber}\n\n`;
        
        switch (product.availability) {
            case 'in-stock':
                message += '✅ Este produto está atualmente EM ESTOQUE e disponível para entrega imediata.';
                break;
            case 'special-order':
                message += '📦 Este produto está disponível como item de PEDIDO ESPECIAL. Entre em contato conosco para prazo de entrega.';
                break;
            case 'out-of-stock':
                message += '❌ Este produto está atualmente FORA DE ESTOQUE. Entre em contato conosco para atualizações de disponibilidade.';
                break;
        }
        
        message += '\n\nEntre em contato conosco pelo (11) 3368-6305 ou contato@simacautomotiva.com.br para mais informações.';
        
        alert(message);
    }
}

function requestQuote(partNumber) {
    const product = productsData.find(p => p.partNumber === partNumber);
    if (product) {
        const message = `Solicitação de Cotação para:\n\nProduto: ${product.name}\nMarca: ${product.brand}\nCódigo: ${partNumber}\n\nRetornaremos com preços e disponibilidade em até 24 horas.\n\nContato: (11) 3368-6305 ou contato@simacautomotiva.com.br`;
        alert(message);
    }
}

// Função utilitária para gerenciar comportamento responsivo
function handleResize() {
    // Adicionar qualquer manipulação JavaScript responsiva se necessário
}

window.addEventListener('resize', handleResize);