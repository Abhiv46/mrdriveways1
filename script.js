document.addEventListener('DOMContentLoaded', function() {
    console.log('Mr. Driveways website loaded successfully!');

    // ==================== MOBILE NAVIGATION ====================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change hamburger to X and back
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (navLinks && navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !mobileToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }
    });

    // ==================== AREA CALCULATOR ====================
    const calcButton = document.getElementById('sizeCalculatorBtn');
    const sizeInput = document.getElementById('projectSize');
    const resultDisplay = document.getElementById('sizeResult');

    if (calcButton && sizeInput && resultDisplay) {
        calcButton.addEventListener('click', function() {
            const sqftValue = parseFloat(sizeInput.value);
            
            if (isNaN(sqftValue) || sqftValue <= 0) {
                resultDisplay.textContent = '❌ Kripya sahi Square Feet number daalen.';
                resultDisplay.style.color = '#dc3545';
                resultDisplay.style.backgroundColor = '#ffe6e6';
            } else {
                // Conversion: 1 sq ft = 0.092903 sq m
                const sqmValue = (sqftValue * 0.09290304).toFixed(2);
                resultDisplay.innerHTML = `✅ <strong>${sqftValue} sq ft</strong> barabar hai approx <strong>${sqmValue} m²</strong> ke.`;
                resultDisplay.style.color = '#004085';
                resultDisplay.style.backgroundColor = '#e7f5ff';
                
                // Also update the size input with the calculated value (optional)
                // sizeInput.value = sqftValue; // Keep original value
            }
        });
    }

    // ==================== WHATSAPP QUOTE FUNCTION ====================
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const form = document.getElementById('quoteForm');
            
            // Check form validity
            if (!form.checkValidity()) {
                // Highlight invalid fields
                const invalidInputs = form.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                    
                    // Remove highlight after 3 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }, 3000);
                });
                
                // Show alert and focus on first invalid field
                alert('Kripya saare required fields (*) fill karein.');
                if (invalidInputs.length > 0) {
                    invalidInputs[0].focus();
                }
                return;
            }

            // Collect form data
            const formData = {
                name: form.querySelector('[name="name"]').value,
                phone: form.querySelector('[name="phone"]').value,
                service: form.querySelector('[name="serviceType"]').value,
                postcode: form.querySelector('[name="postcode"]').value,
                size: form.querySelector('[name="size"]').value || 'Not provided',
                email: form.querySelector('[name="email"]').value || 'Not provided',
                description: form.querySelector('[name="description"]').value || 'Not provided'
            };

            // Map service values to readable names
            const serviceNames = {
                'driveway': 'Naya Driveway',
                'fencing': 'Fencing / Boundary Wall',
                'sealing': 'Driveway Sealing & Cleaning',
                'repair': 'Repair & Refinish',
                'other': 'Dusra Kaam'
            };

            // Build WhatsApp message
            const message = `*🚗 Mr. Driveways - FREE Quote Request*` + `\n` +
                           `📅 ${new Date().toLocaleDateString('en-GB')}` + `\n\n` +
                           `*Customer Details:*` + `\n` +
                           `• Name: ${formData.name}` + `\n` +
                           `• Phone: ${formData.phone}` + `\n` +
                           `• Postcode: ${formData.postcode}` + `\n` +
                           (formData.email !== 'Not provided' ? `• Email: ${formData.email}\n` : '') + `\n` +
                           `*Project Details:*` + `\n` +
                           `• Service: ${serviceNames[formData.service] || formData.service}` + `\n` +
                           `• Size: ${formData.size} sq ft` + `\n` +
                           (formData.description !== 'Not provided' ? `• Notes: ${formData.description.substring(0, 100)}${formData.description.length > 100 ? '...' : ''}\n` : '') + `\n` +
                           `📍 Birmingham Area` + `\n` +
                           `_This message was sent from the Mr. Driveways website._`;

            // Encode message for URL
            const encodedMsg = encodeURIComponent(message);
            const phoneNumber = '447883555131'; // Your WhatsApp number
            
            // Open WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank');
            
            // Optional: Show confirmation
            setTimeout(() => {
                alert('WhatsApp opened! Agar app nahi khula, toh kripya check karein ki aapke device pe WhatsApp installed hai.');
            }, 500);
        });
    }

    // ==================== FORM SUBMISSION ====================
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '#28a745';
                }
            });
            
            if (!isValid) {
                alert('Kripya saare required fields fill karein.');
                return;
            }
            
            // Show success message
            const name = this.querySelector('[name="name"]').value;
            alert(`Shukriya ${name}! Aapka FREE quote request submit ho gaya. Hum 24 ghante ke andar aapse contact karenge.`);
            
            // Optional: Reset form after successful submission
            // this.reset();
            // if (resultDisplay) resultDisplay.textContent = '';
            
            // In a real application, you would send data to your server here
            // Example using fetch():
            /*
            const formData = new FormData(this);
            fetch('/api/submit-quote', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Quote request submitted successfully!');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again.');
            });
            */
        });
    }

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    document.body.style.overflow = '';
                }
                
                // Calculate scroll position
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== FORM INPUT VALIDATION STYLING ====================
    const formInputs = document.querySelectorAll('#quoteForm input, #quoteForm select, #quoteForm textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur styling
        input.addEventListener('focus', function() {
            this.style.borderColor = '#0066ff';
            this.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        // Real-time validation for number input
        if (input.type === 'number' && input.id === 'projectSize') {
            input.addEventListener('input', function() {
                const value = parseFloat(this.value);
                if (isNaN(value) || value < 0) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });
        }
    });

    // ==================== INITIALIZATION MESSAGE ====================
    console.log('All features initialized: Mobile menu, Area calculator, WhatsApp button, Form validation');
});
