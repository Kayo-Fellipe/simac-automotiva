/**
 * SIMAC - Catalog Specific JavaScript
 * Product filtering, searching, and display logic
 */

// DOM Elements
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

// Application State
let currentProducts = [];
let filteredProducts = [];

// ======================
// Initialization
// ======================

document.addEventListener('DOMContentLoaded', function() {
    if (typeof productsData !== 'undefined') {
        currentProducts = [...productsData];
        filteredProducts = [...productsData];

        initializeFilters();
        setupEventListeners();
        displayProducts(currentProducts);
        hideLoading();
    } else {
        console.error('Products data not loaded');
        showNoResults();
        hideLoading();
    }
});

// ======================
// Filter Initialization
// ======================

function initializeFilters() {
    // Get unique brands and categories
    const brands = [...new Set(productsData.map(product => product.brand))].sort();
    const categories = [...new Set(productsData.map(product => product.category))].sort();

    // Populate brand filters
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

    // Populate category filters
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

// ======================
// Event Listeners
// ======================

function setupEventListeners() {
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', window.SIMAC.debounce(handleSearch, 300));
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Filter functionality
    if (brandFilters) {
        brandFilters.addEventListener('change', handleFilters);
    }

    if (categoryFilters) {
        categoryFilters.addEventListener('change', handleFilters);
    }

    if (availabilityAll) {
        availabilityAll.addEventListener('change', handleAvailabilityFilter);
    }

    if (availabilityInStock) {
        availabilityInStock.addEventListener('change', handleAvailabilityFilter);
    }

    if (availabilitySpecialOrder) {
        availabilitySpecialOrder.addEventListener('change', handleAvailabilityFilter);
    }

    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

// ======================
// Search Handling
// ======================

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

// ======================
// Sort Handling
// ======================

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

// ======================
// Filter Handling
// ======================

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

    // Reapply search if there's a search query
    if (searchInput && searchInput.value.trim() !== '') {
        handleSearch();
    } else {
        filteredProducts = [...currentProducts];
        displayProducts(filteredProducts);
    }
}

function handleAvailabilityFilter() {
    // Ensure only one availability option is selected at a time
    if (availabilityAll.checked) {
        availabilityInStock.checked = false;
        availabilitySpecialOrder.checked = false;
    } else if (availabilityInStock.checked || availabilitySpecialOrder.checked) {
        availabilityAll.checked = false;
    }

    handleFilters();
}

function getSelectedFilterValues(container) {
    const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function getSelectedAvailability() {
    const selected = [];
    if (availabilityAll && availabilityAll.checked) selected.push('all');
    if (availabilityInStock && availabilityInStock.checked) selected.push('in-stock');
    if (availabilitySpecialOrder && availabilitySpecialOrder.checked) selected.push('special-order');
    return selected;
}

// ======================
// Clear Filters
// ======================

function clearAllFilters() {
    // Clear search
    if (searchInput) {
        searchInput.value = '';
    }

    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });

    // Reset sorting
    if (sortSelect) {
        sortSelect.value = 'name';
    }

    // Reset data
    currentProducts = [...productsData];
    filteredProducts = [...productsData];

    displayProducts(filteredProducts);

    window.SIMAC.showToast('Filtros limpos com sucesso', 'success');
}

// ======================
// Display Products
// ======================

function displayProducts(products) {
    showLoading();

    // Simulate loading for better UX
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

function renderProducts(products) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

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

function updateResultsCount(count) {
    if (resultsCount) {
        resultsCount.textContent = `${count} produto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
    }
}

// ======================
// Loading States
// ======================

function showLoading() {
    if (loading) loading.style.display = 'block';
    if (productsGrid) productsGrid.style.display = 'none';
}

function hideLoading() {
    if (loading) loading.style.display = 'none';
    if (productsGrid) productsGrid.style.display = 'grid';
}

function showNoResults() {
    if (noResults) noResults.style.display = 'block';
    if (productsGrid) productsGrid.style.display = 'none';
}

function hideNoResults() {
    if (noResults) noResults.style.display = 'none';
    if (productsGrid) productsGrid.style.display = 'grid';
}

// ======================
// Product Actions
// ======================

function checkAvailability(partNumber) {
    const product = productsData.find(p => p.partNumber === partNumber);
    if (!product) return;

    let message = '';
    let type = 'info';

    switch (product.availability) {
        case 'in-stock':
            message = `✅ ${product.name} está em estoque e disponível para entrega imediata!`;
            type = 'success';
            break;
        case 'special-order':
            message = `📦 ${product.name} está disponível como pedido especial. Entre em contato para prazo de entrega.`;
            type = 'warning';
            break;
        case 'out-of-stock':
            message = `❌ ${product.name} está temporariamente fora de estoque. Entre em contato para mais informações.`;
            type = 'error';
            break;
    }

    window.SIMAC.showToast(message, type, 7000);
}

function requestQuote(partNumber) {
    const product = productsData.find(p => p.partNumber === partNumber);
    if (!product) return;

    // Create WhatsApp message
    const message = encodeURIComponent(
        `Olá! Gostaria de solicitar uma cotação para:\n\n` +
        `Produto: ${product.name}\n` +
        `Marca: ${product.brand}\n` +
        `Código: ${partNumber}\n\n` +
        `Aguardo retorno. Obrigado!`
    );

    const whatsappURL = `https://wa.me/551133686305?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Make functions globally available
window.checkAvailability = checkAvailability;
window.requestQuote = requestQuote;
