// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // Add interactive hover effects
    const interactiveElements = document.querySelectorAll('.question, .week, .tip, .grade');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '🖨️ Print Syllabus';
        printButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0076A5;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#005a82';
            this.style.transform = 'translateY(-2px)';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#0076A5';
            this.style.transform = 'translateY(0)';
        });
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
    
    // Add print button
    addPrintButton();
    
    // Accessibility improvements
    function improveAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#description';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #0076A5;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add focus indicators for better keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, [tabindex]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #0076A5';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    improveAccessibility();
    
    // Add current date update for dynamic content
    function updateCurrentDate() {
        const currentDate = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        // Add last updated info to footer
        const footer = document.querySelector('footer .container');
        if (footer) {
            const lastUpdated = document.createElement('p');
            lastUpdated.textContent = `Last updated: ${formattedDate}`;
            lastUpdated.style.fontSize = '0.9rem';
            lastUpdated.style.marginTop = '10px';
            footer.appendChild(lastUpdated);
        }
    }
    
    updateCurrentDate();
    
    // Add email protection
    function protectEmails() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            const email = link.href.replace('mailto:', '');
            link.addEventListener('click', function(e) {
                // Basic spam protection
                const confirmation = confirm(`Send email to ${email}?`);
                if (!confirmation) {
                    e.preventDefault();
                }
            });
        });
    }
    
    protectEmails();
});