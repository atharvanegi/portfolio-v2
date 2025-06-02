document.addEventListener('DOMContentLoaded', function() {
    initPageLoading();
    initMobileNavigation();
    initExperienceTabs();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderEffects();
    initProjectHoverEffects();
    initBackToTop();
    initThemeToggle();
    initSkillCardAnimations();
    initTypingEffect();
    initContactEnhancements();
    setCurrentYear();
    
    function initPageLoading() {
        const pageTransition = document.querySelector('.page-transition');
        
        setTimeout(() => {
            if (pageTransition) {
                pageTransition.style.transform = 'translateY(-100%)';
                
                setTimeout(() => {
                    pageTransition.remove();
                }, 500);
            }
        }, 1200);
    }

    function initMobileNavigation() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const nav = document.getElementById('nav');
        const navLinks = document.querySelectorAll('nav a');
        const backdrop = document.getElementById('mobile-menu-backdrop');
        
        function toggleMobileMenu() {
            const isActive = mobileMenuToggle.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        function openMobileMenu() {
            mobileMenuToggle.classList.add('active');
            nav.classList.add('active');
            backdrop.classList.add('active');
            document.body.classList.add('menu-open');
            
            const firstFocusableElement = nav.querySelector('a');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        }
        
        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        if (backdrop) {
            backdrop.addEventListener('click', closeMobileMenu);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    function initExperienceTabs() {
        const companyTabs = document.querySelectorAll('.companies li');
        const experienceItems = document.querySelectorAll('.experience-item');
        
        companyTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                companyTabs.forEach(t => t.classList.remove('active'));
                experienceItems.forEach(item => item.classList.remove('active'));
                
                tab.classList.add('active');
                
                const companyId = tab.getAttribute('data-company');
                const targetItem = document.getElementById(companyId);
                
                if (targetItem) {
                    targetItem.classList.add('active');
                    
                    targetItem.style.opacity = '0';
                    targetItem.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        targetItem.style.opacity = '1';
                        targetItem.style.transform = 'translateY(0)';
                        targetItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    }, 50);
                }
            });
            
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tab.click();
                }
            });
        });
    }
    
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    if (entry.target.classList.contains('skills-category')) {
                        const skillCards = entry.target.querySelectorAll('.skill-card');
                        skillCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                    
                    if (entry.target.classList.contains('project-grid')) {
                        const projectCards = entry.target.querySelectorAll('.other-project-card');
                        projectCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('section, .skills-category, .project-grid').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
        
        document.querySelectorAll('.skill-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
        
        document.querySelectorAll('.other-project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
    }
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = window.innerWidth <= 768 ? 70 : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    updateActiveNavLink(targetId);
                }
            });
        });
    }
    
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    function initHeaderEffects() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('header');
        const nav = document.getElementById('nav');
        
        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                
                if (currentScrollY > lastScrollY && !nav.classList.contains('active')) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.85)';
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        }
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    function initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        const otherProjectCards = document.querySelectorAll('.other-project-card');
        
        projectCards.forEach(card => {
            const projectImage = card.querySelector('.project-image');
            const projectContent = card.querySelector('.project-content');
            
            if (projectImage && projectContent) {
                card.addEventListener('mouseenter', () => {
                    projectImage.style.transform = 'scale(1.05)';
                    projectContent.style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', () => {
                    projectImage.style.transform = 'scale(1)';
                    projectContent.style.transform = 'translateY(0)';
                });
            }
        });
        
        otherProjectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px -15px rgba(2, 12, 27, 0.7)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px -15px rgba(2, 12, 27, 0.7)';
            });
        });
    }
    
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        function toggleBackToTopButton() {
            if (window.scrollY > 300) {
                backToTopButton?.classList.add('visible');
            } else {
                backToTopButton?.classList.remove('visible');
            }
        }
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleBackToTopButton();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        if (backToTopButton) {
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        const currentTheme = localStorage.getItem('portfolio-theme') || getSystemTheme();
        setTheme(currentTheme);
        
        function getSystemTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }
        
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);
            
            if (themeIcon) {
                themeIcon.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
                    themeIcon.style.transform = 'scale(1)';
                }, 150);
            }
            
            if (themeToggle) {
                themeToggle.style.transform = 'rotate(180deg) scale(1.1)';
                setTimeout(() => {
                    themeToggle.style.transform = 'rotate(0deg) scale(1)';
                }, 300);
            }
        }
        
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTheme();
            });
            
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
        
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('portfolio-theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    setTheme(newTheme);
                }
            });
        }
    }
    
    function initSkillCardAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.color = 'var(--green)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    function initTypingEffect() {
        const roleText = document.querySelector('.role-text');
        if (!roleText) return;
        
        const roles = [
            'Full Stack Developer',
            'AI Researcher',
            'Backend Developer',
            'Frontend Developer'
            
        ];
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeRole() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                roleText.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                roleText.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeRole, typeSpeed);
        }
        
        setTimeout(typeRole, 2000);
    }
    
    function initContactEnhancements() {
        const contactCards = document.querySelectorAll('.contact-card');
        const ctaButton = document.querySelector('.contact .cta-button');
        const socialLinks = document.querySelectorAll('.social-links a');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.contact-icon');
                card.style.transform = 'translateY(-8px) scale(1.02)';
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.contact-icon');
                card.style.transform = 'translateY(0) scale(1)';
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });

            card.addEventListener('focus', () => {
                const icon = card.querySelector('.contact-icon');
                card.style.transform = 'translateY(-8px) scale(1.02)';
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
            });

            card.addEventListener('blur', () => {
                const icon = card.querySelector('.contact-icon');
                card.style.transform = 'translateY(0) scale(1)';
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.classList.contains('contact-card') ? 
                        Array.from(contactCards).indexOf(entry.target) * 100 : 0;

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    
                    contactObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const animatedElements = [
            ...contactCards,
            ctaButton,
            document.querySelector('.social-links')
        ].filter(Boolean);

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            contactObserver.observe(element);
        });
    }
    
    function setCurrentYear() {
        const yearElements = document.querySelectorAll('#current-year, #currentYear');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    function initNavigationActiveState() {
        const sections = document.querySelectorAll('section[id]');
        
        function updateActiveNavigation() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNavigation();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    initNavigationActiveState();
    
    document.body.classList.add('loaded');
    
    function preloadImages() {
        const imageUrls = [
            'assets/profile.jpg',
            'assets/project1.jpg',
            'assets/project2.jpg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    window.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Image failed to load:', e.target.src);
        }
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    addEnhancedStyles();
    
    function addEnhancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .contact-card:focus-visible,
            .theme-toggle:focus-visible {
                outline: 2px solid var(--green);
                outline-offset: 2px;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .contact-card,
                .theme-toggle,
                .cta-button {
                    transition: none !important;
                }
                
                .heart {
                    animation: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    console.log(`
    %c👋 Welcome to Atharva Negi's Portfolio!
    %c🚀 Built with vanilla HTML, CSS, and JavaScript
    %c💻 View source: https://github.com/atharvanegi
    %c📧 Contact: anegi2@emory.edu
    `, 
    'color: #64ffda; font-size: 16px; font-weight: bold;',
    'color: #8892b0; font-size: 14px;',
    'color: #64ffda; font-size: 14px;',
    'color: #64ffda; font-size: 14px;'
    );
});