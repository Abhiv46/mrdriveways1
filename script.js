/* -------------------------------------------------
   script.js – Mr. Driveways Website
   Enhanced with professional features and UX improvements
------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== MOBILE NAVIGATION ====================
    const mobileToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && mobileToggle && 
            !navLinks.contains(event.target) && 
            !mobileToggle.contains(event.target) &&
            navLinks.classList.contains('active')) {
            
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== FORM VALIDATION & WHATSAPP ====================
    const quoteForm = document.getElementById('quoteForm');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (quoteForm && whatsappBtn) {
        // Add input validation styling
        const formInputs = quoteForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                } else if (this.value.trim() !== '') {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                }
            });
        });
        
        // Enhanced WhatsApp message builder
        function buildWhatsAppMessage(formData) {
            const date = new Date().toLocaleDateString('hi-IN');
            const time = new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
            
            const lines = [
                `🚗 *Mr. Driveways - नया कोट अनुरोध* 🚗`,
                `📅 ${date} | ⏰ ${time}`,
                ``,
                `👤 *ग्राहक विवरण:*`,
                `• नाम: ${formData.name}`,
                `• ईमेल: ${formData.email}`,
                `• फ़ोन: ${formData.phone}`,
                formData.postcode ? `• पिन कोड: ${formData.postcode}` : '',
                ``,
                `📐 *प्रोजेक्ट विवरण:*`,
                `• आकार: ${formData.size} वर्ग फुट`,
                `• पैटर्न: ${formData.pattern}`,
                formData.timeline ? `• समय सीमा: ${formData.timeline}` : '',
                ``,
                `📝 *अतिरिक्त जानकारी:*`,
                formData.description ? `${formData.description.substring(0, 200)}${formData.description.length > 200 ? '...' : ''}` : 'कोई विवरण नहीं दिया गया',
                ``,
                `📍 *सेवा क्षेत्र:* ग्रेटर लंदन`,
                `⏱️ *प्रतिक्रिया:* 24 घंटे के भीतर`,
                ``,
                `_यह संदेश Mr. Driveways वेबसाइट से स्वचालित रूप से भेजा गया है_`
            ];
            
            return lines.filter(line => line !== '').join('\n');
        }
        
        // URL encode helper
        function encodeForUrl(text) {
            return encodeURIComponent(text);
        }
        
        // WhatsApp button click handler
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!quoteForm.checkValidity()) {
                // Add shake animation to invalid fields
                const invalidInputs = quoteForm.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.classList.add('invalid');
                    input.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                });
                
                // Scroll to first invalid field
                if (invalidInputs.length > 0) {
                    invalidInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                quoteForm.reportValidity();
                return;
            }
            
            // Gather form data
            const formData = {
                name: quoteForm.name.value.trim(),
                email: quoteForm.email.value.trim(),
                phone: quoteForm.phone.value.trim(),
                postcode: quoteForm.postcode ? quoteForm.postcode.value.trim() : '',
                size: quoteForm.size.value,
                pattern: quoteForm.pattern.value,
                timeline: quoteForm.timeline ? quoteForm.timeline.value : '',
                description: quoteForm.description ? quoteForm.description.value.trim() : ''
            };
            
            // Show loading state
            const originalText = whatsappBtn.innerHTML;
            whatsappBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            whatsappBtn.disabled = true;
            
            // Build and send WhatsApp message
            setTimeout(() => {
                const message = buildWhatsAppMessage(formData);
                const encodedMsg = encodeForUrl(message);
                const phoneNumber = '447883555131'; // International format without +
                
                const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
                
                // Open WhatsApp in new tab
                const newWindow = window.open(waUrl, '_blank');
                
                // Reset button state
                whatsappBtn.innerHTML = originalText;
                whatsappBtn.disabled = false;
                
                // Show success message
                if (newWindow) {
                    showNotification('WhatsApp opened successfully!', 'success');
                    
                    // Optionally clear form after successful submission
                    if (confirm('Form submitted successfully! Would you like to clear the form?')) {
                        quoteForm.reset();
                        formInputs.forEach(input => {
                            input.classList.remove('valid', 'invalid');
                        });
                    }
                } else {
                    showNotification('Could not open WhatsApp. Please check your popup settings.', 'error');
                }
                
                // Send data to backend (optional - uncomment if you have backend)
                // sendToBackend(formData);
                
            }, 1000); // Simulate processing time
        });
        
        // Form submission handler (for regular form submission)
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // In a real application, you would send this to your server
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification(`Thank you ${data.name}! Your quote request has been submitted. We'll contact you within 24 hours.`, 'success');
            
            // Reset form
            setTimeout(() => {
                this.reset();
                formInputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            }, 2000);
        });
    }

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // ==================== FORM DATE VALIDATION ====================
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        input.min = today;
        
        // Add date validation
        input.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            
            if (selectedDate < today) {
                this.setCustomValidity('Please select a future date');
                this.classList.add('invalid');
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
    });

    // ==================== ANIMATIONS ON SCROLL ====================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .tiktok-embed, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ==================== BACKEND INTEGRATION (OPTIONAL) ====================
    async function sendToBackend(data) {
        try {
            // Replace with your actual backend endpoint
            const response = await fetch('/api/submit-quote', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Success:', result);
            return result;
            
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Fallback: the WhatsApp message was already sent
            return null;
        }
    }

    // ==================== ADDITIONAL CSS FOR JS FEATURES ====================
    const style = document.createElement('style');
    style.textContent = `
        /* Form validation styles */
        input.valid, select.valid, textarea.valid {
            border-color: #4CAF50 !important;
            background-color: rgba(76, 175, 80, 0.05) !important;
        }
        
        input.invalid, select.invalid, textarea.invalid {
            border-color: #f44336 !important;
            background-color: rgba(244, 67, 54, 0.05) !important;
        }
        
        /* Notification styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification.error {
            border-left: 4px solid #f44336;
        }
        
        .notification.info {
            border-left: 4px solid #2196F3;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification.success .notification-content i {
            color: #4CAF50;
        }
        
        .notification.error .notification-content i {
            color: #f44336;
        }
        
        .notification.info .notification-content i {
            color: #2196F3;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 4px;
            margin-left: 10px;
            font-size: 0.9rem;
        }
        
        /* Shake animation for invalid fields */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        /* Loading state for button */
        .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Mobile menu backdrop */
        @media (max-width: 768px) {
            .nav-links::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.5);
                z-index: -1;
                opacity: 0;
                transition: opacity 0.4s ease;
            }
            
            .nav-links.active::before {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== INITIALIZE PAGE ====================
    console.log('Mr. Driveways website initialized successfully');
});
