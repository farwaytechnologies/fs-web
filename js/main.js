// Main JavaScript file for Farway Security website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    // Only initialize if there are multiple testimonials
    if (testimonials.length > 1) {
        // Add navigation buttons to the testimonial slider
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        
        // Create previous and next buttons
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.className = 'testimonial-nav-btn prev';
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.className = 'testimonial-nav-btn next';
        
        // Add buttons to the navigation container
        navButtons.appendChild(prevButton);
        navButtons.appendChild(nextButton);
        
        // Add navigation after the testimonial slider
        testimonialSlider.parentNode.insertBefore(navButtons, testimonialSlider.nextSibling);
        
        // Function to show the current testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.style.display = 'block';
                    testimonial.style.opacity = '1';
                } else {
                    testimonial.style.display = 'none';
                    testimonial.style.opacity = '0';
                }
            });
        }
        
        // Initialize the slider
        showTestimonial(currentTestimonial);
        
        // Add event listeners to navigation buttons
        prevButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        nextButton.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        // Auto-rotate testimonials every 5 seconds
        let autoRotate = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Pause auto-rotation when hovering over testimonials or nav buttons
        const testimonialSection = document.querySelector('.testimonials');
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        testimonialSection.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        });
    }
    
    // Form submission handling
    const trialForm = document.querySelector('.trial-form');
    
    if (trialForm) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the data to a server
                // For now, we'll just show a success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `<p>Thank you! Your free trial request has been sent to <strong>${email}</strong>. Please check your inbox for further instructions.</p>`;
                
                // Replace the form with the success message
                formContainer.replaceChild(successMessage, this);
            }
        });
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial');
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .product-card, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.visible, .product-card.visible, .testimonial.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav.active {
            display: block;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        nav.active ul {
            flex-direction: column;
            align-items: center;
        }
        
        .success-message {
            background-color: rgba(52, 199, 89, 0.1);
            border: 1px solid var(--secondary-color);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
});