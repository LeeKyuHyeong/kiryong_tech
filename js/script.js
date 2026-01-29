// ===================================
// Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate toggle icon to X
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            });
        });
    }
    
    // Mobile dropdown toggle
    const dropdownParents = document.querySelectorAll('.has-dropdown');
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a');
        if (link && window.innerWidth <= 968) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    parent.classList.toggle('dropdown-open');
                }
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            dropdownParents.forEach(parent => {
                parent.classList.remove('dropdown-open');
            });
        }
    });
});

// ===================================
// Hero Slider
// ===================================
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Start auto slide
        this.startAutoSlide();
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });
        }
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
        
        // Pause on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }
    }
    
    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = n;
        if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    previousSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 8000); // Change slide every 5 seconds
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

// ===================================
// Statistics Counter Animation
// ===================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;
        
        if (this.counters.length > 0) {
            this.init();
        }
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
});

// ===================================
// Scroll Animations (AOS)
// ===================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// ===================================
// Navbar Scroll Effect
// ===================================
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            } else {
                this.navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Initialize navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    new NavbarScroll();
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ===================================
// Notice Search Functionality (Basic)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const noticeItems = document.querySelectorAll('.notice-item');
    
    if (searchInput && noticeItems.length > 0) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            noticeItems.forEach(item => {
                const title = item.querySelector('.notice-title').textContent.toLowerCase();
                
                if (title.includes(searchTerm)) {
                    item.style.display = 'grid';
                } else {
                    item.style.display = 'none';
                }
            });
        };
        
        // Search on button click
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Clear search when input is empty
        searchInput.addEventListener('input', () => {
            if (searchInput.value === '') {
                noticeItems.forEach(item => {
                    item.style.display = 'grid';
                });
            }
        });
    }
});

// ===================================
// Lazy Loading Images
// ===================================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loader
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});

// ===================================
// Back to Top Button (Optional)
// ===================================
class BackToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }
    
    createButton() {
        const button = document.createElement('button');
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 999;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        `;
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        return button;
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });
    }
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
});

// ===================================
// Form Validation (if needed in future)
// ===================================
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            }
        });
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, '필수 항목입니다.');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
        } else {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.className = 'error-message';
            newErrorDiv.textContent = message;
            newErrorDiv.style.cssText = 'color: #ff4444; font-size: 14px; margin-top: 5px;';
            input.parentElement.appendChild(newErrorDiv);
        }
        input.style.borderColor = '#ff4444';
    }
    
    clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
}

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===================================
// Console Log for Development
// ===================================
console.log('%c기룡테크 웹사이트', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%c정밀 금형 제작의 선두주자', 'color: #1a2332; font-size: 14px;');