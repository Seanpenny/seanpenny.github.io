// ==============================
// Initialize AOS Animations
// ==============================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ==============================
// Typing Animation
// ==============================
const typingText = document.getElementById('typing-text');
const words = ['Software Engineer', 'Mobile Developer', 'Full Stack Developer', 'Process Automation Expert'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ==============================
// Floating Navigation
// ==============================
const floatingNav = document.querySelector('.floating-nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==============================
// Service Details Functionality
// ==============================
const serviceDetailsOverlay = document.getElementById('service-details');
const closeBtn = document.querySelector('.close-btn');
const serviceDetailContents = document.querySelectorAll('.service-detail-content');

function showServiceDetails(serviceType) {
    // Hide all service detail contents
    serviceDetailContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show the selected service detail
    const selectedContent = document.getElementById(`${serviceType}-details`);
    if (selectedContent) {
        selectedContent.classList.add('active');
        serviceDetailsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceDetails() {
    serviceDetailsOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close service details when clicking outside
serviceDetailsOverlay.addEventListener('click', (e) => {
    if (e.target === serviceDetailsOverlay) {
        closeServiceDetails();
    }
});

// Close service details with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceDetailsOverlay.classList.contains('active')) {
        closeServiceDetails();
    }
});

closeBtn.addEventListener('click', closeServiceDetails);

// ==============================
// Portfolio Carousel
// ==============================
const carouselTrack = document.querySelector('.carousel-track');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
const itemWidth = 432; // 400px width + 32px gap

function moveCarousel(direction) {
    const totalItems = portfolioItems.length;
    const maxIndex = totalItems - 1;
    
    if (direction === 1) {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    
    const translateX = -currentIndex * itemWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    // Update button states
    updateCarouselButtons();
}

function updateCarouselButtons() {
    const totalItems = portfolioItems.length;
    
    if (currentIndex === 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    }
    
    if (currentIndex === totalItems - 1) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.pointerEvents = 'none';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }
}

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    moveCarousel(1);
}, 5000);

// Pause auto-advance on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
});

// Initialize carousel buttons
updateCarouselButtons();

// ==============================
// Scroll to Top Button
// ==============================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==============================
// Contact Form Handling
// ==============================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual form handling)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ==============================
// Notification System
// ==============================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ri-${type === 'success' ? 'check-line' : 'error-warning-line'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : '#ff6b35'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ==============================
// Parallax Effects
// ==============================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particles, .grid-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==============================
// Intersection Observer for Animations
// ==============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// ==============================
// Performance Optimizations
// ==============================
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// ==============================
// Preloader (if needed)
// ==============================
window.addEventListener('load', () => {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ==============================
// Error Handling
// ==============================
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// ==============================
// Export functions for global access
// ==============================
window.showServiceDetails = showServiceDetails;
window.closeServiceDetails = closeServiceDetails;
window.moveCarousel = moveCarousel;
