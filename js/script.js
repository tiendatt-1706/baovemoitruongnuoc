
document.addEventListener('DOMContentLoaded', function() {
    // ================================
    // EARTH ANIMATION (Hero Section)
    // ================================
    const actionBtn = document.getElementById('actionBtn');
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    const earthContainer = document.getElementById('earthContainer');
    const trashEarth = document.querySelector('.earth-trash');
    const cleanEarth = document.querySelector('.earth-clean');

    let isClean = false;

    if (actionBtn && earthContainer) {
        actionBtn.addEventListener('click', function() {
            if (!isClean) {
                // --- ACTIVATE CLEAN MODE ---
                
                // 1. Flip Earth images
                trashEarth.classList.remove('active');
                cleanEarth.classList.add('active');
                
                // 2. Start floating animation
                earthContainer.classList.add('alive');
                
                // 3. Change hero background
                heroSection.classList.add('clean-mode');
                
                // 4. Update title
                if (heroTitle) {
                    heroTitle.innerHTML = 'CẢM ƠN BẠN ĐÃ<br><span class="highlight">HÀNH ĐỘNG!</span>';
                }
                
                // 5. Update button
                actionBtn.classList.add('clean');
                actionBtn.innerHTML = '<i class="fas fa-undo"></i><span>Quay về thực tại</span>';
                
                isClean = true;
                
            } else {
                // --- RETURN TO POLLUTED MODE ---
                
                // 1. Flip back
                cleanEarth.classList.remove('active');
                trashEarth.classList.add('active');
                
                // 2. Stop floating
                earthContainer.classList.remove('alive');
                
                // 3. Reset background
                heroSection.classList.remove('clean-mode');
                
                // 4. Reset title
                if (heroTitle) {
                    heroTitle.innerHTML = 'HÀNH TINH HAY<br><span class="highlight">BÃI RÁC ?</span>';
                }
                
                // 5. Reset button
                actionBtn.classList.remove('clean');
                actionBtn.innerHTML = '<i class="fas fa-leaf"></i><span>Đánh thức sự sống</span>';
                
                isClean = false;
            }
        });
    }

    // ================================
    // NAVBAR SCROLL EFFECT
    // ================================
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ================================
    // SCROLL ANIMATIONS
    // ================================
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollAnimation();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScrollAnimation();

    // ================================
    // COUNTER ANIMATION
    // ================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000; // Animation duration in ms
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    // Trigger counter animation when in view
    const statsSection = document.querySelector('.overview-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ================================
    // TABS FUNCTIONALITY
    // ================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // CONTACT FORM HANDLING
    // ================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // You can add your form submission logic here
                // For now, just show a success message
                alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm.');
                contactForm.reset();
            }
        });
    }

    // ================================
    // NEWSLETTER FORM
    // ================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput.value) {
                alert('Đăng ký nhận tin thành công!');
                emailInput.value = '';
            }
        });
    }

    // ================================
    // PARALLAX EFFECT FOR HERO
    // ================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        if (hero) {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
            }
        }
    });

    // ================================
    // WATER RIPPLE EFFECT ON CLICK
    // ================================
    document.addEventListener('click', function(e) {
        // Only on certain sections
        const effectTargets = document.querySelectorAll('.hero, .overview, .effects');
        let isInTarget = false;

        effectTargets.forEach(target => {
            if (target.contains(e.target)) {
                isInTarget = true;
            }
        });

        if (isInTarget && !e.target.closest('a, button, input, textarea')) {
            createRipple(e.pageX, e.pageY);
        }
    });

    function createRipple(x, y) {
        const ripple = document.createElement('span');
        ripple.className = 'water-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    // Add ripple styles dynamically
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .water-ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(144, 224, 239, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleEffect 1s ease-out;
            pointer-events: none;
            z-index: 9999;
        }

        @keyframes rippleEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

    // ================================
    // ACTIVE NAV LINK ON SCROLL
    // ================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    // ================================
    // LOADING ANIMATION
    // ================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Animate hero elements
        const heroElements = document.querySelectorAll('.animate-fade-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
            }, index * 200);
        });
    });

    // ================================
    // BUBBLE ANIMATION ENHANCEMENT
    // ================================
    const bubbleContainer = document.querySelector('.water-bubbles');

    if (bubbleContainer) {
        // Add more bubbles dynamically
        for (let i = 0; i < 5; i++) {
            const bubble = document.createElement('span');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDelay = Math.random() * 5 + 's';
            bubble.style.width = Math.random() * 30 + 20 + 'px';
            bubble.style.height = bubble.style.width;
            bubbleContainer.appendChild(bubble);
        }
    }

    // ================================
    // INTERSECTION OBSERVER FOR LAZY ANIMATIONS
    // ================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => observer.observe(el));

    // ================================
    // POLLUTION JOURNEY ANIMATION
    // ================================
    const journeySteps = document.querySelectorAll('.journey-step');
    let journeyAnimated = false;

    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !journeyAnimated) {
                journeyAnimated = true;
                journeySteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('step-visible');
                    }, index * 300);
                });
            }
        });
    }, { threshold: 0.2 });

    const pollutionJourney = document.querySelector('.pollution-journey');
    if (pollutionJourney) {
        journeyObserver.observe(pollutionJourney);
    }

    // Add journey animation styles
    const journeyStyles = document.createElement('style');
    journeyStyles.textContent = `
        .journey-step {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .journey-step.step-visible {
            opacity: 1;
            transform: translateX(0);
        }

        .journey-step:nth-child(even) {
            transform: translateX(30px);
        }

        .journey-step:nth-child(even).step-visible {
            transform: translateX(0);
        }

        .step-connector {
            opacity: 0;
            transition: opacity 0.5s ease 0.3s;
        }

        .journey-step.step-visible .step-connector {
            opacity: 1;
        }

        .nav-links a.active {
            color: var(--primary-color) !important;
        }

        .nav-links a.active::after {
            width: 100%;
        }

        /* Responsive animation adjustments */
        @media (max-width: 768px) {
            .journey-step {
                transform: translateY(30px);
            }
            .journey-step:nth-child(even) {
                transform: translateY(30px);
            }
            .journey-step.step-visible,
            .journey-step:nth-child(even).step-visible {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(journeyStyles);

    // ================================
    // COMMUNITY COUNTER ANIMATION
    // ================================
    const communityCount = document.getElementById('communityCount');
    let counterAnimated = false;

    const animateCommunityCounter = () => {
        if (!communityCount || counterAnimated) return;
        counterAnimated = true;

        const target = parseInt(communityCount.getAttribute('data-target'));
        const duration = 2500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeOutExpo * target);

            communityCount.textContent = current.toLocaleString('vi-VN');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                communityCount.textContent = target.toLocaleString('vi-VN');
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const counterSection = document.querySelector('.community-counter');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCommunityCounter();
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterSection);
    }

    // ================================
    // WATER QUIZ FUNCTIONALITY
    // ================================
    const quizContainer = document.getElementById('quizContainer');
    const quizProgress = document.getElementById('quizProgress');
    const quizResult = document.getElementById('quizResult');
    const correctCountEl = document.getElementById('correctCount');
    const joinCommunityBtn = document.getElementById('joinCommunity');

    let currentQuestion = 1;
    let correctAnswers = 0;
    const totalQuestions = 3;

    if (quizContainer) {
        const allOptions = quizContainer.querySelectorAll('.quiz-option');

        allOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Prevent multiple clicks
                const currentQuestionEl = this.closest('.quiz-question');
                const options = currentQuestionEl.querySelectorAll('.quiz-option');

                // Disable all options
                options.forEach(opt => opt.disabled = true);

                // Check answer
                const isCorrect = this.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    this.classList.add('correct');
                    correctAnswers++;
                } else {
                    this.classList.add('wrong');
                    // Show correct answer
                    options.forEach(opt => {
                        if (opt.getAttribute('data-correct') === 'true') {
                            opt.classList.add('correct');
                        }
                    });
                }

                // Update progress
                quizProgress.style.width = ((currentQuestion / totalQuestions) * 100) + '%';

                // Move to next question after delay
                setTimeout(() => {
                    currentQuestionEl.classList.remove('active');

                    if (currentQuestion < totalQuestions) {
                        currentQuestion++;
                        const nextQuestion = quizContainer.querySelector(`[data-question="${currentQuestion}"]`);
                        if (nextQuestion) {
                            nextQuestion.classList.add('active');
                        }
                    } else {
                        // Show result
                        showQuizResult();
                    }
                }, 1200);
            });
        });
    }

    function showQuizResult() {
        if (quizResult && correctCountEl) {
            correctCountEl.textContent = correctAnswers;
            quizResult.classList.add('show');

            // Update result message based on score
            const resultTitle = quizResult.querySelector('.result-title');
            const resultMessage = quizResult.querySelector('.result-message');
            const resultIcon = quizResult.querySelector('.result-icon i');

            if (correctAnswers === 3) {
                resultTitle.textContent = 'Xuất sắc!';
                resultMessage.textContent = 'Bạn đã hiểu rõ về vấn đề ô nhiễm nước!';
                resultIcon.className = 'fas fa-trophy';
            } else if (correctAnswers === 2) {
                resultTitle.textContent = 'Tốt lắm!';
                resultMessage.textContent = 'Bạn có kiến thức tốt, hãy tìm hiểu thêm nhé!';
                resultIcon.className = 'fas fa-medal';
            } else if (correctAnswers === 1) {
                resultTitle.textContent = 'Cố gắng hơn!';
                resultMessage.textContent = 'Hãy đọc thêm về bảo vệ nguồn nước nhé!';
                resultIcon.className = 'fas fa-lightbulb';
            } else {
                resultTitle.textContent = 'Đừng nản!';
                resultMessage.textContent = 'Hãy khám phá thêm để hiểu rõ hơn!';
                resultIcon.className = 'fas fa-book-open';
            }
        }
    }

    // Join community button
    if (joinCommunityBtn && communityCount) {
        joinCommunityBtn.addEventListener('click', function() {
            const currentCount = parseInt(communityCount.getAttribute('data-target'));
            const newCount = currentCount + 1;

            communityCount.setAttribute('data-target', newCount);
            communityCount.textContent = newCount.toLocaleString('vi-VN');

            // Update button
            this.innerHTML = '<i class="fas fa-check"></i> Đã tham gia!';
            this.classList.add('joined');

            // Scroll to counter with highlight effect
            const counterEl = document.querySelector('.community-counter');
            if (counterEl) {
                counterEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                counterEl.style.animation = 'highlightPulse 1s ease';
                setTimeout(() => {
                    counterEl.style.animation = '';
                }, 1000);
            }
        });

        // Add highlight animation
        const highlightStyle = document.createElement('style');
        highlightStyle.textContent = `
            @keyframes highlightPulse {
                0%, 100% { box-shadow: 0 15px 40px rgba(0, 119, 182, 0.3); }
                50% { box-shadow: 0 0 60px rgba(0, 180, 216, 0.8); }
            }
        `;
        document.head.appendChild(highlightStyle);
    }

    console.log('SaveWater - Landing Page Loaded Successfully!');
});