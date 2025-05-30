// 담양 DNA 소상공인 원클릭 허가 시스템 - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 즉시 카운터 애니메이션 시작
    setTimeout(() => {
        animateCounters();
    }, 500); // 0.5초 후 시작

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

    // 개선된 카운터 애니메이션
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            if (counter.dataset.animated) return; // 이미 애니메이션된 경우 건너뛰기
            
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // 2초
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // easeOutQuart 이징 함수
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = target * easeProgress;
                
                // 소수점이 있는 경우와 없는 경우 구분
                if (target % 1 !== 0) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
                    counter.dataset.animated = 'true';
                }
            };
            
            requestAnimationFrame(animate);
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
                
                // 섹션별 카운터가 화면에 나타날 때 애니메이션
                const sectionCounters = entry.target.querySelectorAll('.counter');
                if (sectionCounters.length > 0) {
                    sectionCounters.forEach(counter => {
                        if (!counter.dataset.animated) {
                            animateSingleCounter(counter);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // 단일 카운터 애니메이션 함수
    function animateSingleCounter(counter) {
        if (counter.dataset.animated) return;
        
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = target * easeProgress;
            
            if (target % 1 !== 0) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
                counter.dataset.animated = 'true';
            }
        };
        
        requestAnimationFrame(animate);
    }

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

    // 향상된 파티클 애니메이션
    function createParticles() {
        const heroSection = document.querySelector('#home');
        if (!heroSection) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 3}s;
                pointer-events: none;
                z-index: 1;
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
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-30px) translateX(10px);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-20px) translateX(-15px);
                opacity: 1;
            }
            75% {
                transform: translateY(-35px) translateX(5px);
                opacity: 0.6;
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

        /* 카운터 글자 개선 */
        .counter {
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.05em;
        }

        /* 모바일 반응형 개선 */
        @media (max-width: 768px) {
            .counter {
                font-size: 2rem !important;
            }
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