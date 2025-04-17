
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Toggle the answer visibility
            const answer = this.nextElementSibling;
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
            } else {
                answer.classList.add('active');
            }
        });
    });
    
    // Form validation
    const supportForms = document.querySelectorAll('.support-form form');
    
    supportForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger-color)';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (isValid) {
                // Show success message (in a real application, this would submit the form)
                alert('Your request has been submitted. Our team will contact you shortly.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
});