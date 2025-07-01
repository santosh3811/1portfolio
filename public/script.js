document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');
    
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabLinks.forEach(t => t.classList.remove('active-link'));
            tabContents.forEach(c => c.classList.remove('active-tab'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active-link');
            document.getElementById(tabId).classList.add('active-tab');
        });
    });

    // Mobile menu functionality
    const sidemenu = document.getElementById('sidemenu');
    
    function openmenu() {
        sidemenu.style.right = '0';
    }
    
    function closemenu() {
        sidemenu.style.right = '-200px';
    }
    
    // Close menu when clicking on a link
    document.querySelectorAll('#sidemenu a').forEach(link => {
        link.addEventListener('click', closemenu);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                formMessage.textContent = error.message;
                formMessage.classList.add('error');
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success', 'error');
                formMessage.textContent = '';
            }, 5000);
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

