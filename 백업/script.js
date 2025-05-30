// 담양 DNA 소상공인 원클릭 허가 시스템 - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Scroll reveal animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
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
                entry.target.classList.add('revealed');
                
                // Animate counters when they come into view
                if (entry.target.querySelector('.counter')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Mobile menu implementation
            console.log('Mobile menu clicked');
        });
    }

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        revealOnScroll();
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Particle animation for hero section
    function createParticles() {
        const heroSection = document.querySelector('#home');
        if (!heroSection) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            heroSection.appendChild(particle);
        }
    }

    createParticles();

    // Form validation helper (for future forms)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    // Add CSS for particles and other animations
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.5;
            }
            33% {
                transform: translateY(-20px) translateX(10px);
                opacity: 1;
            }
            66% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.8;
            }
        }
        
        nav {
            transition: transform 0.3s ease;
        }
        
        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .hover-scale {
            transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Console welcome message
    console.log(`
    🎋 담양 DNA 소상공인 원클릭 허가 시스템 🎋
    
    ✨ 2025 담양군 규제혁신 아이디어 공모전 출품작
    📧 문의: sanoramyun8@gmail.com
    📱 연락처: 010-7939-3123
    
    Digital · Nature-tourism · Agriculture
    `);
});

// Utility functions for other pages
window.DamyangDNA = {
    // Smooth scroll to element
    scrollTo: function(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Show loading spinner
    showLoading: function() {
        const loader = document.createElement('div');
        loader.id = 'loading';
        loader.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
                    <div class="w-6 h-6 border-3 border-damyang-green border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-gray-700">처리 중...</span>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
    },

    // Hide loading spinner
    hideLoading: function() {
        const loader = document.getElementById('loading');
        if (loader) {
            loader.remove();
        }
    },

    // Show notification
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
            type === 'success' ? 'bg-damyang-green' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};