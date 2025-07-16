// Advanced Furniture Website JavaScript
class FurnitureWebsite {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.currentSlide = 0;
        this.currentTestimonial = 0;
        this.isLoading = true;
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.loadingScreen();
        this.heroSlider();
        this.testimonialSlider();
        this.initializeSearch();
        this.initializeTheme();
        this.initializeFilters();
        this.initializeCounters();
        this.initializeScrollEffects();
        this.updateCartDisplay();
        this.updateWishlistDisplay();
        
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    initializeEventListeners() {
        // Navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Search
        const searchIcon = document.querySelector('.search-icon');
        const searchInput = document.querySelector('.search-input');
        searchIcon?.addEventListener('click', () => this.toggleSearch());
        searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Cart and Wishlist
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon?.addEventListener('click', (e) => this.openCartModal(e));

        const wishlistIcon = document.querySelector('.wishlist-icon');
        wishlistIcon?.addEventListener('click', (e) => this.openWishlistModal(e));

        // Product interactions
        document.addEventListener('click', (e) => this.handleProductClick(e));

        // Modal controls
        document.addEventListener('click', (e) => this.handleModalClick(e));

        // Form submissions
        const contactForm = document.querySelector('.contact-form');
        const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
        
        contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleNewsletterForm(e));
        });

        // Hero buttons
        const ctaPrimary = document.querySelector('.cta-primary');
        const ctaSecondary = document.querySelector('.cta-secondary');
        
        ctaPrimary?.addEventListener('click', () => this.scrollToProducts());
        ctaSecondary?.addEventListener('click', () => this.showVideoModal());

        // Slider controls
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const sliderDots = document.querySelectorAll('.slider-dots .dot');

        prevBtn?.addEventListener('click', () => this.previousSlide());
        nextBtn?.addEventListener('click', () => this.nextSlide());
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Testimonial controls
        const testimonialPrev = document.querySelector('.testimonial-btn.prev');
        const testimonialNext = document.querySelector('.testimonial-btn.next');
        const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

        testimonialPrev?.addEventListener('click', () => this.previousTestimonial());
        testimonialNext?.addEventListener('click', () => this.nextTestimonial());
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToTestimonial(index));
        });

        // Back to top
        const backToTop = document.querySelector('.back-to-top');
        backToTop?.addEventListener('click', () => this.scrollToTop());

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', () => this.handleCategoryClick(card));
        });

        // Load more products
        const loadMoreBtn = document.querySelector('.load-more-btn');
        loadMoreBtn?.addEventListener('click', () => this.loadMoreProducts());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize events
        window.addEventListener('resize', () => this.handleResize());
    }

    loadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
            this.isLoading = false;
        }, 2000);
    }

    heroSlider() {
        const slides = document.querySelectorAll('.slide');
        if (!slides.length) return;

        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        slides[this.currentSlide]?.classList.remove('active');
        dots[this.currentSlide]?.classList.remove('active');
        
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        
        slides[this.currentSlide]?.classList.add('active');
        dots[this.currentSlide]?.classList.add('active');
    }

    previousSlide() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        slides[this.currentSlide]?.classList.remove('active');
        dots[this.currentSlide]?.classList.remove('active');
        
        this.currentSlide = this.currentSlide === 0 ? slides.length - 1 : this.currentSlide - 1;
        
        slides[this.currentSlide]?.classList.add('active');
        dots[this.currentSlide]?.classList.add('active');
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        slides[this.currentSlide]?.classList.remove('active');
        dots[this.currentSlide]?.classList.remove('active');
        
        this.currentSlide = index;
        
        slides[this.currentSlide]?.classList.add('active');
        dots[this.currentSlide]?.classList.add('active');
    }

    testimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (!testimonials.length) return;

        setInterval(() => {
            this.nextTestimonial();
        }, 6000);
    }

    nextTestimonial() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        testimonials[this.currentTestimonial]?.classList.remove('active');
        dots[this.currentTestimonial]?.classList.remove('active');
        
        this.currentTestimonial = (this.currentTestimonial + 1) % testimonials.length;
        
        testimonials[this.currentTestimonial]?.classList.add('active');
        dots[this.currentTestimonial]?.classList.add('active');
    }

    previousTestimonial() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        testimonials[this.currentTestimonial]?.classList.remove('active');
        dots[this.currentTestimonial]?.classList.remove('active');
        
        this.currentTestimonial = this.currentTestimonial === 0 ? testimonials.length - 1 : this.currentTestimonial - 1;
        
        testimonials[this.currentTestimonial]?.classList.add('active');
        dots[this.currentTestimonial]?.classList.add('active');
    }

    goToTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        testimonials[this.currentTestimonial]?.classList.remove('active');
        dots[this.currentTestimonial]?.classList.remove('active');
        
        this.currentTestimonial = index;
        
        testimonials[this.currentTestimonial]?.classList.add('active');
        dots[this.currentTestimonial]?.classList.add('active');
    }

    initializeSearch() {
        this.products = [
            { name: 'Modern Sofa', category: 'living', price: 1299, image: 'sofa.jpg' },
            { name: 'Oak Dining Table', category: 'dining', price: 899, image: 'table.jpg' },
            { name: 'Leather Armchair', category: 'living', price: 699, image: 'chair.jpg' },
            { name: 'Glass Coffee Table', category: 'living', price: 449, image: 'coffee-table.jpg' },
            { name: 'Wooden Bookshelf', category: 'office', price: 329, image: 'bookshelf.jpg' },
            { name: 'Platform Bed Frame', category: 'bedroom', price: 599, image: 'bed.jpg' }
        ];
    }

    toggleSearch() {
        const searchInput = document.querySelector('.search-input');
        searchInput?.classList.toggle('active');
        if (searchInput?.classList.contains('active')) {
            searchInput.focus();
        }
    }

    handleSearch(query) {
        if (!query.trim()) return;

        const results = this.products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        this.showSearchResults(results);
    }

    showSearchResults(results) {
        // Implementation for showing search results
        console.log('Search results:', results);
        this.showNotification(`Found ${results.length} results`, 'info');
    }

    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        this.showNotification(`Switched to ${this.theme} mode`, 'info');
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    handleFilter(button) {
        const filter = button.getAttribute('data-filter');
        const productCards = document.querySelectorAll('.product-card');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });

        this.showNotification(`Filtered by ${filter === 'all' ? 'all categories' : filter}`, 'info');
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    initializeScrollEffects() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Header effect
            if (scrollY > 100) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
            
            // Back to top button
            if (scrollY > 500) {
                backToTop?.classList.add('visible');
            } else {
                backToTop?.classList.remove('visible');
            }
        });
    }

    initializeAnimations() {
        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-icon');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            floatingElements.forEach((element, index) => {
                const rate = scrolled * (0.5 + index * 0.1);
                element.style.transform = `translateY(${rate}px)`;
            });
        });

        // Product card animations
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }

    handleProductClick(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const product = e.target.getAttribute('data-product');
            const price = parseFloat(e.target.getAttribute('data-price'));
            this.addToCart(product, price);
        } else if (e.target.classList.contains('add-to-wishlist')) {
            const product = e.target.getAttribute('data-product');
            this.addToWishlist(product);
        } else if (e.target.classList.contains('quick-view')) {
            const product = e.target.getAttribute('data-product');
            this.showQuickView(product);
        }
    }

    addToCart(productName, price) {
        const existingItem = this.cart.find(item => item.product === productName);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                product: productName,
                price: price,
                quantity: 1,
                id: Date.now()
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${productName} added to cart!`, 'success');
        this.animateCartIcon();
    }

    addToWishlist(productName) {
        if (!this.wishlist.find(item => item.product === productName)) {
            this.wishlist.push({
                product: productName,
                id: Date.now()
            });
            
            this.saveWishlist();
            this.updateWishlistDisplay();
            this.showNotification(`${productName} added to wishlist!`, 'success');
        } else {
            this.showNotification(`${productName} is already in wishlist!`, 'warning');
        }
    }

    removeFromCart(productName) {
        this.cart = this.cart.filter(item => item.product !== productName);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${productName} removed from cart`, 'info');
    }

    changeQuantity(productName, change) {
        const item = this.cart.find(item => item.product === productName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productName);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;
    }

    updateWishlistDisplay() {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) wishlistCount.textContent = this.wishlist.length;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon?.classList.add('bounce');
        setTimeout(() => cartIcon?.classList.remove('bounce'), 600);
    }

    openCartModal(e) {
        e.preventDefault();
        const modal = document.getElementById('cart-modal');
        if (modal) {
            modal.style.display = 'block';
            this.renderCartItems();
        }
    }

    openWishlistModal(e) {
        e.preventDefault();
        // Create and show wishlist modal
        this.showNotification('Wishlist feature coming soon!', 'info');
    }

    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin: 2rem 0;">Your cart is empty</p>';
            cartTotal.textContent = '0';
            return;
        }

        let total = 0;
        cartItems.innerHTML = '';

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h4>${item.product}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="furniture.changeQuantity('${item.product}', -1)" class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="furniture.changeQuantity('${item.product}', 1)" class="quantity-btn plus">+</button>
                    <button onclick="furniture.removeFromCart('${item.product}')" class="remove-btn">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    handleModalClick(e) {
        if (e.target.classList.contains('close')) {
            this.closeModal(e.target.closest('.modal'));
        } else if (e.target.classList.contains('modal')) {
            this.closeModal(e.target);
        } else if (e.target.classList.contains('checkout-btn')) {
            this.handleCheckout();
        } else if (e.target.classList.contains('continue-shopping')) {
            this.closeModal(e.target.closest('.modal'));
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }

        // Simulate checkout process
        this.showNotification('Redirecting to checkout...', 'info');
        setTimeout(() => {
            this.showNotification('Thank you for your order!', 'success');
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
            this.closeModal(document.getElementById('cart-modal'));
        }, 2000);
    }

    showQuickView(productName) {
        const modal = document.getElementById('quick-view-modal');
        if (modal) {
            // Populate quick view content
            const quickViewBody = modal.querySelector('.quick-view-body');
            quickViewBody.innerHTML = `
                <div class="quick-view-content">
                    <h2>${productName}</h2>
                    <p>Quick view feature coming soon!</p>
                </div>
            `;
            modal.style.display = 'block';
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateContactForm(data)) return;
        
        // Simulate form submission
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateContactForm(data) {
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }

    handleNewsletterForm(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        this.showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            z-index: 10000;
            font-weight: 600;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    scrollToProducts() {
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            const headerHeight = 80;
            const targetPosition = productsSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    showVideoModal() {
        this.showNotification('Video feature coming soon!', 'info');
    }

    handleCategoryClick(card) {
        const category = card.getAttribute('data-category');
        this.scrollToProducts();
        
        setTimeout(() => {
            const filterBtn = document.querySelector(`[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        }, 500);
    }

    loadMoreProducts() {
        const button = document.querySelector('.load-more-btn');
        const originalText = button.textContent;
        
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            this.showNotification('All products loaded!', 'info');
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            // Close modals
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    this.closeModal(modal);
                }
            });
            
            // Close mobile menu
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu?.classList.contains('active')) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        }
    }

    handleScroll() {
        // Update header style
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header?.style.setProperty('background', 'rgba(255, 255, 255, 0.98)');
            header?.style.setProperty('box-shadow', '0 2px 20px rgba(0, 0, 0, 0.15)');
        } else {
            header?.style.setProperty('background', 'rgba(255, 255, 255, 0.95)');
            header?.style.setProperty('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)');
        }
    }

    handleResize() {
        // Handle responsive behavior
        const searchInput = document.querySelector('.search-input');
        if (window.innerWidth <= 768) {
            searchInput?.classList.remove('active');
        }
    }
}

// Additional utility functions
function addSlideInAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .quantity-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            cursor: pointer;
            margin: 0 0.25rem;
            transition: var(--transition);
        }
        
        .quantity-btn:hover {
            background: var(--primary-dark);
        }
        
        .remove-btn {
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 0.25rem 0.75rem;
            border-radius: 3px;
            cursor: pointer;
            margin-left: 1rem;
            transition: var(--transition);
        }
        
        .remove-btn:hover {
            background: #c0392b;
        }
        
        .quantity {
            font-weight: 600;
            padding: 0 0.5rem;
        }
        
        .nav-icon.bounce {
            animation: bounce 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Create lightbox effect
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: var(--border-radius);
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global furniture instance
    window.furniture = new FurnitureWebsite();
    
    // Add additional animations
    addSlideInAnimations();
    
    // Initialize gallery
    initializeGallery();
    
    // Console welcome message
    console.log('%c🛋️ Modern Furniture Website Loaded Successfully! 🛋️', 
        'background: linear-gradient(135deg, #8B4513 0%, #6d3410 100%); color: white; padding: 10px; border-radius: 5px; font-size: 16px;');
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Service Worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    });
}
