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

    // ==================== UPDATED AREA CALCULATOR ====================
    // FIXED: Now asks for Length (ft) and Width (ft) and calculates Area (sq ft)
    const calcButton = document.getElementById('sizeCalculatorBtn');
    const sizeInput = document.getElementById('projectSize');
    const resultDisplay = document.getElementById('sizeResult');

    if (calcButton && sizeInput && resultDisplay) {
        calcButton.addEventListener('click', function() {
            // Ask for Length in feet
            const lengthInput = prompt("Enter LENGTH in feet (ft):");
            if (lengthInput === null) {
                resultDisplay.textContent = 'Calculation cancelled.';
                resultDisplay.style.color = '#666';
                return;
            }
            
            // Ask for Width in feet
            const widthInput = prompt("Enter WIDTH in feet (ft):");
            if (widthInput === null) {
                resultDisplay.textContent = 'Calculation cancelled.';
                resultDisplay.style.color = '#666';
                return;
            }
            
            // Convert to numbers
            const length = parseFloat(lengthInput);
            const width = parseFloat(widthInput);
            
            // Validate inputs
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
                resultDisplay.textContent = '❌ Invalid input. Please enter positive numbers for length and width.';
                resultDisplay.style.color = '#dc3545';
                resultDisplay.style.backgroundColor = '#ffe6e6';
            } else {
                // Calculate area: Length (ft) × Width (ft) = Area (sq ft)
                const areaSqFt = (length * width).toFixed(2);
                resultDisplay.innerHTML = `✅ Area = <strong>${areaSqFt} sq ft</strong><br><small>(Length: ${length} ft × Width: ${width} ft)</small>`;
                resultDisplay.style.color = '#004085';
                resultDisplay.style.backgroundColor = '#e7f5ff';
                
                // Auto-fill the Project Size input field
                sizeInput.value = areaSqFt;
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
                alert('Please fill all required fields (*).');
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
                'driveway': 'New Driveway',
                'fencing': 'Fencing / Boundary Wall',
                'sealing': 'Driveway Sealing & Cleaning',
                'repair': 'Repair & Refinish',
                'other': 'Other Work'
            };

            // Build WhatsApp message
            const message = `*🚗 Mr. Driveways - FREE Quote Request*` + `\n` +
                           `📅 ${new Date().toLocaleDateString('en-GB')}` + `\n\n` +
                           `*Customer Details:*` + `\n` +
                           `• Name: ${formData.name}` + `\n` +
                           `• Phone: ${formData.phone}` + `\n` +
                           `• Postcode: ${formData.postcode}` + `\
