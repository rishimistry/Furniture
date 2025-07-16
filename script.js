// Advanced Furniture Website JavaScript
class FurnitureWebsite {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.currentTestimonial = 0;
        this.testimonials = [];
        this.cart = JSON.parse(localStorage.getItem('furnitureCart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('furnitureWishlist')) || [];
        this.searchResults = [];
        this.notifications = [];
        this.isMenuOpen = false;
        this.isMobile = window.innerWidth <= 768;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchThreshold = 50;
        
        this.init();
    }

    init() {
        this.checkDevice();
        this.bindEvents();
        this.handleLoadingScreen();
        this.initializeSliders();
        this.updateCartUI();
        this.updateWishlistUI();
        this.initializeTheme();
        this.initializeAnimations();
        this.initializeModals();
        this.initializeNotifications();
        this.initializeSearch();
        this.initializeMobileOptimizations();
        this.initializeAccessibilityFeatures();
        this.initializeTouch();
    }

    checkDevice() {
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Add device classes to body
        document.body.classList.toggle('is-mobile', this.isMobile);
        document.body.classList.toggle('is-tablet', this.isTablet);
        document.body.classList.toggle('is-touch', this.isTouch);
    }

    bindEvents() {
        // Existing events
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        
        // Mobile-specific events
        document.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });

        // Enhanced mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking nav links
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMobile) {
                        this.closeMobileMenu();
                    }
                });
            });
        }

        // Enhanced touch-friendly cart interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    this.addToCart(productCard);
                }
            }

            if (e.target.matches('.add-to-wishlist')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    this.addToWishlist(productCard);
                }
            }

            if (e.target.matches('.quick-view')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    this.showQuickView(productCard);
                }
            }
        });

        // Filter buttons with better mobile handling
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilterClick(e.target);
            });
        });

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search functionality
        const searchIcon = document.querySelector('.search-icon');
        const searchInput = document.querySelector('.search-input');
        
        if (searchIcon && searchInput) {
            searchIcon.addEventListener('click', () => this.toggleSearch());
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        // Back to top button with better mobile handling
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }

        // Enhanced modal handling
        document.addEventListener('click', (e) => {
            if (e.target.matches('.close') || e.target.closest('.close')) {
                this.closeModal();
            }
            
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }

            if (e.target.matches('[data-modal]')) {
                e.preventDefault();
                this.openModal(e.target.dataset.modal);
            }
        });

        // Form submissions with better error handling
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.contact-form')) {
                e.preventDefault();
                this.handleContactForm(e.target);
            }
            
            if (e.target.matches('.newsletter-form')) {
                e.preventDefault();
                this.handleNewsletterForm(e.target);
            }
        });

        // Hero slider controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('.slider-btn.prev')) {
                this.previousSlide();
            }
            if (e.target.matches('.slider-btn.next')) {
                this.nextSlide();
            }
            if (e.target.matches('.dot')) {
                const index = Array.from(e.target.parentNode.children).indexOf(e.target);
                this.goToSlide(index);
            }
        });

        // Testimonial controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('.testimonial-btn.prev')) {
                this.previousTestimonial();
            }
            if (e.target.matches('.testimonial-btn.next')) {
                this.nextTestimonial();
            }
            if (e.target.matches('.testimonial-dots .dot')) {
                const index = Array.from(e.target.parentNode.children).indexOf(e.target);
                this.goToTestimonial(index);
            }
        });
    }

    initializeTouch() {
        // Touch navigation for sliders
        const heroSlider = document.querySelector('.hero-slider');
        const testimonialSlider = document.querySelector('.testimonials-slider');

        if (heroSlider) {
            this.addTouchListeners(heroSlider, {
                onSwipeLeft: () => this.nextSlide(),
                onSwipeRight: () => this.previousSlide()
            });
        }

        if (testimonialSlider) {
            this.addTouchListeners(testimonialSlider, {
                onSwipeLeft: () => this.nextTestimonial(),
                onSwipeRight: () => this.previousTestimonial()
            });
        }

        // Touch navigation for mobile menu
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && this.isMobile) {
            this.addTouchListeners(navMenu, {
                onSwipeRight: () => this.closeMobileMenu()
            });
        }

        // Pull to refresh (visual feedback only)
        if (this.isMobile) {
            let startY = 0;
            let currentY = 0;
            let isRefreshing = false;

            document.addEventListener('touchstart', (e) => {
                if (window.pageYOffset === 0) {
                    startY = e.touches[0].pageY;
                }
            }, { passive: true });

            document.addEventListener('touchmove', (e) => {
                if (window.pageYOffset === 0 && !isRefreshing) {
                    currentY = e.touches[0].pageY;
                    const deltaY = currentY - startY;
                    
                    if (deltaY > 80) {
                        this.showNotification('Release to refresh', 'info');
                        isRefreshing = true;
                    }
                }
            }, { passive: true });

            document.addEventListener('touchend', () => {
                if (isRefreshing) {
                    this.showNotification('Page refreshed!', 'success');
                    isRefreshing = false;
                }
                startY = 0;
                currentY = 0;
            });
        }
    }

    addTouchListeners(element, callbacks) {
        element.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            if (!this.touchStartX || !this.touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = this.touchStartX - touchEndX;
            const deltaY = this.touchStartY - touchEndY;
            
            // Ensure horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.touchThreshold) {
                if (deltaX > 0 && callbacks.onSwipeLeft) {
                    callbacks.onSwipeLeft();
                } else if (deltaX < 0 && callbacks.onSwipeRight) {
                    callbacks.onSwipeRight();
                }
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > this.touchThreshold) {
                if (deltaY > 0 && callbacks.onSwipeUp) {
                    callbacks.onSwipeUp();
                } else if (deltaY < 0 && callbacks.onSwipeDown) {
                    callbacks.onSwipeDown();
                }
            }

            this.touchStartX = 0;
            this.touchStartY = 0;
        }, { passive: true });
    }

    initializeMobileOptimizations() {
        // Optimize images for mobile
        if (this.isMobile) {
            this.optimizeImages();
        }

        // Enhanced mobile focus management
        this.improveFocusManagement();

        // Mobile-specific performance optimizations
        this.optimizeForMobile();

        // Add mobile-specific CSS classes
        this.addMobileClasses();

        // Initialize mobile-specific features
        this.initializeMobileFeatures();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for mobile performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add mobile-optimized sizes
            if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
            }
        });
    }

    improveFocusManagement() {
        // Improve focus visibility on mobile
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focused');
            });
        });

        // Trap focus in modals
        this.trapFocusInModals();
    }

    trapFocusInModals() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal[style*="block"]');
                if (modal) {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    if (focusableElements.length === 0) return;

                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            }
        });
    }

    optimizeForMobile() {
        // Reduce motion for mobile performance
        if (this.isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }

        // Optimize scroll performance
        this.optimizeScrollPerformance();

        // Debounce resize events more aggressively on mobile
        if (this.isMobile) {
            this.resizeTimeout = null;
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.handleResize();
                }, 500);
            });
        }
    }

    optimizeScrollPerformance() {
        // Use passive event listeners for scroll
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        }, { passive: true });
    }

    addMobileClasses() {
        const body = document.body;
        
        if (this.isMobile) {
            body.classList.add('mobile-device');
        }
        
        if (this.isTouch) {
            body.classList.add('touch-device');
        }
        
        // Add orientation class
        const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
        body.classList.add(`orientation-${orientation}`);
    }

    initializeMobileFeatures() {
        // Mobile-specific cart behavior
        if (this.isMobile) {
            this.initializeMobileCart();
        }

        // Mobile keyboard handling
        this.handleMobileKeyboard();

        // Mobile viewport handling
        this.handleMobileViewport();
    }

    initializeMobileCart() {
        // Show cart count more prominently on mobile
        const cartIcon = document.querySelector('.nav-icon[data-modal="cart"]');
        if (cartIcon && this.cart.length > 0) {
            cartIcon.classList.add('has-items');
        }

        // Mobile-optimized cart modal
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && this.isMobile) {
            cartModal.classList.add('mobile-optimized');
        }
    }

    handleMobileKeyboard() {
        // Handle virtual keyboard on mobile
        if (this.isMobile) {
            const inputs = document.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    // Scroll element into view when keyboard appears
                    setTimeout(() => {
                        input.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);
                });

                input.addEventListener('blur', () => {
                    // Scroll back to normal view when keyboard disappears
                    setTimeout(() => {
                        window.scrollTo({
                            top: window.pageYOffset,
                            behavior: 'smooth'
                        });
                    }, 300);
                });
            });
        }
    }

    handleMobileViewport() {
        // Handle viewport changes on mobile (keyboard, orientation)
        const viewportHeight = window.innerHeight;
        
        window.addEventListener('resize', this.debounce(() => {
            const newHeight = window.innerHeight;
            const heightDifference = viewportHeight - newHeight;
            
            // If height decreased significantly, keyboard is probably open
            if (heightDifference > 150) {
                document.body.classList.add('keyboard-open');
            } else {
                document.body.classList.remove('keyboard-open');
            }
        }, 100));
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;

        this.isMenuOpen = !this.isMenuOpen;
        
        hamburger.classList.toggle('active', this.isMenuOpen);
        navMenu.classList.toggle('active', this.isMenuOpen);
        document.body.classList.toggle('menu-open', this.isMenuOpen);

        // Improve accessibility
        hamburger.setAttribute('aria-expanded', this.isMenuOpen);
        navMenu.setAttribute('aria-hidden', !this.isMenuOpen);

        // Focus management
        if (this.isMenuOpen) {
            // Focus first menu item
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        } else {
            // Return focus to hamburger
            hamburger.focus();
        }

        // Prevent body scroll when menu is open
        if (this.isMenuOpen) {
            this.preventBodyScroll();
        } else {
            this.allowBodyScroll();
        }
    }

    closeMobileMenu() {
        if (!this.isMenuOpen) return;
        
        this.isMenuOpen = false;
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        
        if (navMenu) {
            navMenu.classList.remove('active');
            navMenu.setAttribute('aria-hidden', 'true');
        }
        
        document.body.classList.remove('menu-open');
        this.allowBodyScroll();
    }

    preventBodyScroll() {
        const scrollY = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    }

    allowBodyScroll() {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    handleOrientationChange() {
        // Update device detection
        this.checkDevice();
        
        // Update mobile classes
        this.addMobileClasses();
        
        // Refresh sliders
        this.refreshSliders();
        
        // Close mobile menu if open
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Trigger resize handler
        this.handleResize();
    }

    refreshSliders() {
        // Refresh hero slider dimensions
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            this.updateSliderDimensions(heroSlider);
        }

        // Refresh testimonial slider
        const testimonialSlider = document.querySelector('.testimonials-slider');
        if (testimonialSlider) {
            this.updateSliderDimensions(testimonialSlider);
        }
    }

    updateSliderDimensions(slider) {
        const slides = slider.querySelectorAll('.slide, .testimonial-card');
        slides.forEach(slide => {
            slide.style.width = `${slider.offsetWidth}px`;
        });
    }

    // Enhanced existing methods for mobile
    handleResize() {
        const wasMobile = this.isMobile;
        this.checkDevice();
        
        // If device type changed, reinitialize some features
        if (wasMobile !== this.isMobile) {
            this.initializeMobileOptimizations();
            
            // Close mobile menu if switching to desktop
            if (!this.isMobile && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }

        this.updateSliderDimensions();
        this.addMobileClasses();
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Header scroll effect (less aggressive on mobile)
        const header = document.querySelector('.header');
        if (header) {
            const threshold = this.isMobile ? 20 : 50;
            header.classList.toggle('scrolled', scrollY > threshold);
        }

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            const threshold = this.isMobile ? 300 : 500;
            backToTop.classList.toggle('visible', scrollY > threshold);
        }

        // Parallax effects (disabled on mobile for performance)
        if (!this.isMobile) {
            this.handleParallaxEffects(scrollY);
        }

        // Update scroll progress
        this.updateScrollProgress();
    }

    updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update any progress indicators
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    // Enhanced modal handling for mobile
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        
        // Focus management
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }

        // Prevent body scroll on mobile
        if (this.isMobile) {
            this.preventBodyScroll();
        }

        // Add mobile-specific classes
        if (this.isMobile) {
            modal.classList.add('mobile-modal');
        }
    }

    closeModal() {
        const modal = document.querySelector('.modal[style*="block"]');
        if (!modal) return;

        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modal.classList.remove('mobile-modal');
        
        // Allow body scroll
        this.allowBodyScroll();
    }

    // Enhanced notification system for mobile
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add mobile-specific styling
        if (this.isMobile) {
            notification.classList.add('mobile-notification');
        }

        // Position for mobile
        const container = this.getOrCreateNotificationContainer();
        container.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Add to notifications array
        this.notifications.push(notification);

        return notification;
    }

    getOrCreateNotificationContainer() {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            if (this.isMobile) {
                container.classList.add('mobile-notifications');
            }
            document.body.appendChild(container);
        }
        return container;
    }

    removeNotification(notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Existing methods remain the same but can be enhanced...
    handleLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    handlePageLoad() {
        // Initialize AOS (Animate On Scroll) with mobile-friendly settings
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: this.isMobile ? 600 : 1000,
                once: true,
                offset: this.isMobile ? 50 : 100,
                disable: this.isMobile ? 'mobile' : false
            });
        }

        // Initialize smooth scrolling
        this.initSmoothScrolling();
        
        // Initialize counters
        this.initCounters();
        
        // Start auto-sliders with appropriate timing for mobile
        this.startAutoSliders();
    }

    startAutoSliders() {
        // Hero slider
        if (this.slides.length > 1) {
            setInterval(() => {
                if (!document.hidden) {
                    this.nextSlide();
                }
            }, this.isMobile ? 6000 : 5000);
        }

        // Testimonials slider
        if (this.testimonials.length > 1) {
            setInterval(() => {
                if (!document.hidden) {
                    this.nextTestimonial();
                }
            }, this.isMobile ? 8000 : 7000);
        }
    }

    // Utility methods
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ... rest of the existing methods remain the same
    // (initializeSliders, addToCart, addToWishlist, etc.)
    
    initializeSliders() {
        // Hero slider
        this.slides = document.querySelectorAll('.slide');
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
            this.updateDots();
        }

        // Testimonials slider
        this.testimonials = document.querySelectorAll('.testimonial-card');
        if (this.testimonials.length > 0) {
            this.testimonials[0].classList.add('active');
            this.updateTestimonialDots();
        }
    }

    nextSlide() {
        if (this.slides.length === 0) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }

    previousSlide() {
        if (this.slides.length === 0) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }

    goToSlide(index) {
        if (this.slides.length === 0 || index < 0 || index >= this.slides.length) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }

    updateDots() {
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextTestimonial() {
        if (this.testimonials.length === 0) return;
        
        this.testimonials[this.currentTestimonial].classList.remove('active');
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        this.testimonials[this.currentTestimonial].classList.add('active');
        this.updateTestimonialDots();
    }

    previousTestimonial() {
        if (this.testimonials.length === 0) return;
        
        this.testimonials[this.currentTestimonial].classList.remove('active');
        this.currentTestimonial = this.currentTestimonial === 0 ? this.testimonials.length - 1 : this.currentTestimonial - 1;
        this.testimonials[this.currentTestimonial].classList.add('active');
        this.updateTestimonialDots();
    }

    goToTestimonial(index) {
        if (this.testimonials.length === 0 || index < 0 || index >= this.testimonials.length) return;
        
        this.testimonials[this.currentTestimonial].classList.remove('active');
        this.currentTestimonial = index;
        this.testimonials[this.currentTestimonial].classList.add('active');
        this.updateTestimonialDots();
    }

    updateTestimonialDots() {
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonial);
        });
    }

    addToCart(productCard) {
        const product = this.extractProductData(productCard);
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartUI();
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    addToWishlist(productCard) {
        const product = this.extractProductData(productCard);
        const existingItem = this.wishlist.find(item => item.id === product.id);
        
        if (!existingItem) {
            this.wishlist.push(product);
            this.updateWishlistUI();
            this.saveWishlist();
            this.showNotification(`${product.name} added to wishlist!`, 'success');
        } else {
            this.showNotification(`${product.name} is already in wishlist!`, 'warning');
        }
    }

    extractProductData(productCard) {
        const name = productCard.querySelector('.product-info h3')?.textContent || 'Unknown Product';
        const price = productCard.querySelector('.current-price')?.textContent || '$0';
        const image = productCard.querySelector('.product-image img')?.src || '';
        const category = productCard.querySelector('.product-category')?.textContent || 'Uncategorized';
        const id = productCard.dataset.productId || Date.now().toString();
        
        return { id, name, price, image, category };
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    updateWishlistUI() {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
            wishlistCount.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    saveCart() {
        localStorage.setItem('furnitureCart', JSON.stringify(this.cart));
    }

    saveWishlist() {
        localStorage.setItem('furnitureWishlist', JSON.stringify(this.wishlist));
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('furnitureTheme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('furnitureTheme', newTheme);
        this.updateThemeIcon(newTheme);
        
        this.showNotification(`Switched to ${newTheme} theme`, 'info');
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    initializeAnimations() {
        // Counter animations
        this.initCounters();
        
        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            this.initIntersectionObserver();
        }
    }

    initCounters() {
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
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = this.isMobile ? 1500 : 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = current.toLocaleString() + element.textContent.replace(/\d/g, '').replace(/,/g, '');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: this.isMobile ? 0.1 : 0.3,
            rootMargin: this.isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
        });

        // Observe elements with animation classes
        document.querySelectorAll('[data-aos], .product-card, .category-card, .feature-card').forEach(el => {
            observer.observe(el);
        });
    }

    initializeModals() {
        // Create cart modal content
        this.createCartModal();
        
        // Create quick view modal
        this.createQuickViewModal();
        
        // Create search modal
        this.createSearchModal();
    }

    createCartModal() {
        let cartModal = document.getElementById('cart-modal');
        if (!cartModal) {
            cartModal = document.createElement('div');
            cartModal.id = 'cart-modal';
            cartModal.className = 'modal';
            cartModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Shopping Cart</h2>
                        <button class="close" aria-label="Close cart">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="cart-items"></div>
                        <div class="cart-summary">
                            <div class="cart-total">
                                <h3 id="cart-total-amount">$0.00</h3>
                            </div>
                            <button class="checkout-btn">
                                <i class="fas fa-credit-card"></i>
                                Proceed to Checkout
                            </button>
                            <button class="continue-shopping">
                                <i class="fas fa-arrow-left"></i>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(cartModal);

            // Add event listeners
            cartModal.querySelector('.continue-shopping').addEventListener('click', () => {
                this.closeModal();
            });

            cartModal.querySelector('.checkout-btn').addEventListener('click', () => {
                this.showNotification('Checkout functionality coming soon!', 'info');
            });
        }
    }

    createQuickViewModal() {
        let quickViewModal = document.getElementById('quick-view-modal');
        if (!quickViewModal) {
            quickViewModal = document.createElement('div');
            quickViewModal.id = 'quick-view-modal';
            quickViewModal.className = 'modal';
            quickViewModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Quick View</h2>
                        <button class="close" aria-label="Close quick view">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body" id="quick-view-content">
                        <!-- Quick view content will be inserted here -->
                    </div>
                </div>
            `;
            document.body.appendChild(quickViewModal);
        }
    }

    createSearchModal() {
        let searchModal = document.getElementById('search-modal');
        if (!searchModal) {
            searchModal = document.createElement('div');
            searchModal.id = 'search-modal';
            searchModal.className = 'modal';
            searchModal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Search Products</h2>
                        <button class="close" aria-label="Close search">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="search-form">
                            <input type="text" id="modal-search-input" placeholder="Search for products..." autocomplete="off">
                            <button id="modal-search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <div id="search-results"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(searchModal);

            // Add search functionality
            const searchInput = searchModal.querySelector('#modal-search-input');
            const searchBtn = searchModal.querySelector('#modal-search-btn');

            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }
    }

    initializeNotifications() {
        // Create notification container
        this.getOrCreateNotificationContainer();
    }

    initializeSearch() {
        // Initialize search functionality
        this.searchIndex = this.buildSearchIndex();
    }

    buildSearchIndex() {
        // Build search index from product cards
        const products = document.querySelectorAll('.product-card');
        return Array.from(products).map(card => ({
            element: card,
            name: card.querySelector('.product-info h3')?.textContent.toLowerCase() || '',
            category: card.querySelector('.product-category')?.textContent.toLowerCase() || '',
            description: card.querySelector('.product-description')?.textContent.toLowerCase() || ''
        }));
    }

    toggleSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput.classList.contains('active')) {
            searchInput.classList.remove('active');
            searchInput.value = '';
        } else {
            searchInput.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        }
    }

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchIndex.filter(item => 
            item.name.includes(query.toLowerCase()) ||
            item.category.includes(query.toLowerCase()) ||
            item.description.includes(query.toLowerCase())
        );

        this.displaySearchResults(results, query);
    }

    performSearch(query) {
        this.handleSearch(query);
        const searchModal = document.getElementById('search-modal');
        if (searchModal && query) {
            this.openModal('search-modal');
        }
    }

    displaySearchResults(results, query) {
        const searchResultsContainer = document.getElementById('search-results');
        if (!searchResultsContainer) return;

        if (results.length === 0) {
            searchResultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No products found for "${query}"</p>
                </div>
            `;
            return;
        }

        searchResultsContainer.innerHTML = `
            <h3>Found ${results.length} product(s) for "${query}":</h3>
            <div class="search-results-grid">
                ${results.map(result => this.createSearchResultItem(result)).join('')}
            </div>
        `;
    }

    createSearchResultItem(result) {
        const card = result.element;
        const name = card.querySelector('.product-info h3')?.textContent || '';
        const price = card.querySelector('.current-price')?.textContent || '';
        const image = card.querySelector('.product-image img')?.src || '';
        const category = card.querySelector('.product-category')?.textContent || '';

        return `
            <div class="search-result-item" data-product-id="${card.dataset.productId || ''}">
                <img src="${image}" alt="${name}" loading="lazy">
                <div class="search-result-content">
                    <span class="search-result-category">${category}</span>
                    <h4>${name}</h4>
                    <span class="search-result-price">${price}</span>
                    <button class="search-result-btn" onclick="this.scrollToProduct('${card.dataset.productId || ''}')">
                        View Product
                    </button>
                </div>
            </div>
        `;
    }

    scrollToProduct(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            this.closeModal();
            productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            productCard.classList.add('highlighted');
            setTimeout(() => productCard.classList.remove('highlighted'), 2000);
        }
    }

    clearSearchResults() {
        const searchResultsContainer = document.getElementById('search-results');
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = '';
        }
    }

    showQuickView(productCard) {
        const product = this.extractProductData(productCard);
        const quickViewContent = document.getElementById('quick-view-content');
        
        if (quickViewContent) {
            quickViewContent.innerHTML = this.createQuickViewContent(product, productCard);
            this.openModal('quick-view-modal');
        }
    }

    createQuickViewContent(product, productCard) {
        const description = productCard.querySelector('.product-description')?.textContent || 'No description available.';
        const rating = productCard.querySelector('.product-rating')?.innerHTML || '';
        const originalPrice = productCard.querySelector('.original-price')?.textContent || '';

        return `
            <div class="quick-view-product">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <span class="quick-view-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="quick-view-rating">${rating}</div>
                    <p class="quick-view-description">${description}</p>
                    <div class="quick-view-price">
                        ${originalPrice ? `<span class="original-price">${originalPrice}</span>` : ''}
                        <span class="current-price">${product.price}</span>
                    </div>
                    <div class="quick-view-actions">
                        <button class="add-to-cart-btn" onclick="furnitureWebsite.addToCartFromQuickView('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="add-to-wishlist-btn" onclick="furnitureWebsite.addToWishlistFromQuickView('${product.id}')">
                            <i class="fas fa-heart"></i>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addToCartFromQuickView(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            this.addToCart(productCard);
        }
    }

    addToWishlistFromQuickView(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            this.addToWishlist(productCard);
        }
    }

    handleFilterClick(filterBtn) {
        // Remove active class from all filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked filter
        filterBtn.classList.add('active');
        
        // Get filter value
        const filterValue = filterBtn.textContent.toLowerCase().trim();
        
        // Filter products
        this.filterProducts(filterValue);
    }

    filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const productCategory = product.querySelector('.product-category')?.textContent.toLowerCase() || '';
            
            if (category === 'all' || productCategory.includes(category)) {
                product.style.display = 'block';
                product.classList.add('fade-in');
            } else {
                product.style.display = 'none';
                product.classList.remove('fade-in');
            }
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        form.reset();
    }

    handleNewsletterForm(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        
        if (!email || !this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        this.showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeAccessibilityFeatures() {
        // Add ARIA labels and roles where needed
        this.enhanceAccessibility();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
        
        // Add screen reader announcements
        this.addScreenReaderSupport();
    }

    enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.setAttribute('aria-expanded', 'false');
        }

        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.setAttribute('aria-hidden', 'true');
        }

        // Add ARIA labels to icons
        document.querySelectorAll('[class*="fa-"]').forEach(icon => {
            if (!icon.getAttribute('aria-label') && !icon.getAttribute('aria-hidden')) {
                icon.setAttribute('aria-hidden', 'true');
            }
        });

        // Add roles to interactive elements
        document.querySelectorAll('.product-card').forEach(card => {
            card.setAttribute('role', 'article');
        });

        // Add alt text to images if missing
        document.querySelectorAll('img').forEach(img => {
            if (!img.getAttribute('alt')) {
                img.setAttribute('alt', '');
            }
        });
    }

    addKeyboardNavigation() {
        // Add keyboard support for custom interactive elements
        document.querySelectorAll('.product-card, .category-card, .gallery-item').forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Add keyboard support for sliders
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.hero-slider')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }

            if (e.target.closest('.testimonials-slider')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousTestimonial();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextTestimonial();
                }
            }
        });
    }

    addScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Announce slider changes
        this.announceSlideChange = (slideNumber, totalSlides) => {
            liveRegion.textContent = `Slide ${slideNumber} of ${totalSlides}`;
        };

        // Announce cart updates
        this.announceCartUpdate = (message) => {
            liveRegion.textContent = message;
        };
    }

    handleParallaxEffects(scrollY) {
        // Simple parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const speed = 0.5;
            heroBackground.style.transform = `translateY(${scrollY * speed}px)`;
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.furnitureWebsite = new FurnitureWebsite();
});

// Handle service worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
