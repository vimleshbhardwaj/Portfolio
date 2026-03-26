// Smooth scrolling and Intersection Observer for reveal animations
document.addEventListener('DOMContentLoaded', () => {

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Very simple toggle logic for mobile (can be expanded later if needed)
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // close mobile menu if open
            if(window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling via FormSubmit API
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            fetch('https://formsubmit.co/ajax/vimleshb38@gmail.com', {
                method: 'POST',
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                form.reset();
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--accent-color)';
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                formStatus.style.display = 'block';
                formStatus.style.color = '#ef4444'; // Red error text
                formStatus.textContent = 'Oops! There was a problem. Please try again later or email me directly.';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                console.error('Error:', error);
            });
        });
    }
});
