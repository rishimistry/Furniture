// Product Data
const products = [
    {
        id: 1,
        name: "Modern Sofa Set",
        category: "sofas",
        price: 899,
        description: "Comfortable 3-seater sofa with premium fabric upholstery",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23f39c12'><rect width='300' height='200' fill='%23f39c12'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Sofa Image</text></svg>",
        specs: ["Dimensions: 200x90x85 cm", "Material: Premium Fabric", "Color: Charcoal Gray", "Warranty: 5 years"]
    },
    {
        id: 2,
        name: "Luxury King Bed",
        category: "beds",
        price: 1299,
        description: "Elegant king-size bed with upholstered headboard",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23e67e22'><rect width='300' height='200' fill='%23e67e22'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Bed Image</text></svg>",
        specs: ["Dimensions: 200x180x120 cm", "Material: Solid Oak", "Color: Natural Wood", "Warranty: 10 years"]
    },
    {
        id: 3,
        name: "Dining Table Set",
        category: "tables",
        price: 699,
        description: "Solid wood dining table with 6 matching chairs",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23e74c3c'><rect width='300' height='200' fill='%23e74c3c'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Table Image</text></svg>",
        specs: ["Dimensions: 180x90x75 cm", "Material: Solid Walnut", "Seats: 6 people", "Warranty: 7 years"]
    },
    {
        id: 4,
        name: "Office Chair",
        category: "chairs",
        price: 299,
        description: "Ergonomic office chair with lumbar support",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%233498db'><rect width='300' height='200' fill='%233498db'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Chair Image</text></svg>",
        specs: ["Dimensions: 65x65x120 cm", "Material: Mesh & Steel", "Adjustable Height", "Warranty: 3 years"]
    },
    {
        id: 5,
        name: "Wardrobe Cabinet",
        category: "storage",
        price: 849,
        description: "Spacious 3-door wardrobe with mirror",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%239b59b6'><rect width='300' height='200' fill='%239b59b6'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Storage Image</text></svg>",
        specs: ["Dimensions: 150x60x200 cm", "Material: Engineered Wood", "3 Doors with Mirror", "Warranty: 5 years"]
    },
    {
        id: 6,
        name: "Coffee Table",
        category: "tables",
        price: 199,
        description: "Modern glass-top coffee table with wooden legs",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%2334495e'><rect width='300' height='200' fill='%2334495e'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Coffee Table</text></svg>",
        specs: ["Dimensions: 120x60x45 cm", "Material: Glass & Wood", "Tempered Glass Top", "Warranty: 2 years"]
    },
    {
        id: 7,
        name: "Recliner Chair",
        category: "chairs",
        price: 599,
        description: "Comfortable leather recliner with footrest",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%2316a085'><rect width='300' height='200' fill='%2316a085'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Recliner</text></svg>",
        specs: ["Dimensions: 90x95x105 cm", "Material: Genuine Leather", "Reclining Function", "Warranty: 5 years"]
    },
    {
        id: 8,
        name: "Bookshelf Unit",
        category: "storage",
        price: 399,
        description: "5-tier wooden bookshelf for storage and display",
        image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200' fill='%23d35400'><rect width='300' height='200' fill='%23d35400'/><text x='150' y='100' text-anchor='middle' dy='.35em' fill='white' font-family='Arial' font-size='16'>Bookshelf</text></svg>",
        specs: ["Dimensions: 80x30x180 cm", "Material: Pine Wood", "5 Adjustable Shelves", "Warranty: 3 years"]
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentModalQuantity = 1;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const newsletterPopup = document.getElementById('newsletter-popup');
const popupClose = document.getElementById('popup-close');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadProducts();
    loadFeaturedProducts();
    updateCartCount();
    initializeAnimations();
    showNewsletterPopup();
    initializeCounters();
}

function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Scroll to top
    window.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Newsletter popup close
    popupClose.addEventListener('click', closeNewsletterPopup);
    
    // Price range filter
    priceRange.addEventListener('input', function() {
        priceValue.textContent = this.value;
        filterProducts();
    });
    
    // Product filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });
    
    // Cart navigation
    document.querySelector('.cart-link').addEventListener('click', function(e) {
        e.preventDefault();
        showCartSection();
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                if (targetId === 'cart') {
                    showCartSection();
                } else {
                    scrollToSection(targetId);
                }
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactForm);
    
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form, .popup-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-products');
    featuredGrid.innerHTML = '';
    
    // Show first 3 products as featured
    const featuredProducts = products.slice(0, 3);
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image" style="background: linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})">
            <div class="product-overlay">
                <div class="product-actions">
                    <button class="action-btn" onclick="openProductModal(${product.id})">Quick View</button>
                    <button class="action-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price}</p>
        </div>
    `;
    
    return card;
}

function filterProducts() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const maxPrice = parseInt(priceRange.value);
    
    let filteredProducts = products;
    
    if (activeFilter !== 'all') {
        filteredProducts = products.filter(product => product.category === activeFilter);
    }
    
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, index * 100);
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `$${product.price}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    const specsList = document.getElementById('modal-product-specs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });
    
    document.getElementById('modal-quantity').textContent = currentModalQuantity;
    document.getElementById('modal-add-to-cart').onclick = () => addToCart(productId, currentModalQuantity);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentModalQuantity = 1;
}

function changeQuantity(change) {
    currentModalQuantity = Math.max(1, currentModalQuantity + change);
    document.getElementById('modal-quantity').textContent = currentModalQuantity;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeModal();
    
    // Show success message
    showNotification('Product added to cart!');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showCartSection() {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'cart') {
            section.style.display = 'none';
        }
    });
    
    // Show cart section
    const cartSection = document.getElementById('cart');
    cartSection.style.display = 'block';
    
    // Load cart items
    loadCartItems();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light);">Your cart is empty</p>';
        updateCartSummary();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image"></div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart');
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
}

function scrollToSection(sectionId) {
    // Show all sections first
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Hide cart section if it was visible
    const cartSection = document.getElementById('cart');
    cartSection.style.display = 'none';
    
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function handleScroll() {
    // Show/hide scroll to top button
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    // Add navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showNewsletterPopup() {
    // Show popup after 5 seconds if not dismissed before
    setTimeout(() => {
        if (!localStorage.getItem('newsletter-dismissed')) {
            newsletterPopup.style.display = 'block';
        }
    }, 5000);
}

function closeNewsletterPopup() {
    newsletterPopup.style.display = 'none';
    localStorage.setItem('newsletter-dismissed', 'true');
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    let isValid = true;
    
    if (name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearFieldError('name');
    }
    
    if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('email');
    }
    
    if (subject.length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    } else {
        clearFieldError('subject');
    }
    
    if (message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearFieldError('message');
    }
    
    if (isValid) {
        // Simulate form submission
        showNotification('Message sent successfully!');
        e.target.reset();
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (isValidEmail(email)) {
        showNotification('Thank you for subscribing!');
        e.target.reset();
        if (e.target.closest('.newsletter-popup')) {
            closeNewsletterPopup();
        }
    } else {
        showNotification('Please enter a valid email address');
    }
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(fieldName + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeAnimations() {
    // Initialize scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .about-content, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
}

function initializeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => counterObserver.observe(counter));
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
