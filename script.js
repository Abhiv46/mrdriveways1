// FIXED script.js for Mr. Driveways
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded');

    // ========== MOBILE MENU ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // ========== AREA CALCULATOR (FIXED) ==========
    const calcButton = document.getElementById('sizeCalculatorBtn');
    const sizeInput = document.getElementById('projectSize');
    const resultDisplay = document.getElementById('sizeResult');

    if (calcButton && sizeInput && resultDisplay) {
        calcButton.addEventListener('click', function() {
            const lengthInput = prompt("Enter LENGTH in feet (ft):");
            if (lengthInput === null) {
                resultDisplay.textContent = 'Calculation cancelled.';
                resultDisplay.style.color = '#666';
                return;
            }
            
            const widthInput = prompt("Enter WIDTH in feet (ft):");
            if (widthInput === null) {
                resultDisplay.textContent = 'Calculation cancelled.';
                resultDisplay.style.color = '#666';
                return;
            }
            
            const length = parseFloat(lengthInput);
            const width = parseFloat(widthInput);
            
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
                resultDisplay.textContent = 'Invalid input. Please enter positive numbers.';
                resultDisplay.style.color = '#dc3545';
            } else {
                const areaSqFt = (length * width).toFixed(2);
                resultDisplay.innerHTML = `Area = <strong>${areaSqFt} sq ft</strong> (${length}ft × ${width}ft)`;
                resultDisplay.style.color = '#004085';
                sizeInput.value = areaSqFt;
            }
        });
    }

    // ========== WHATSAPP BUTTON (FIXED) ==========
    const whatsappBtn = document.getElementById('whatsappBtn');
    const quoteForm = document.getElementById('quoteForm');
    
    if (whatsappBtn && quoteForm) {
        whatsappBtn.addEventListener('click', function() {
            if (!quoteForm.checkValidity()) {
                alert('Please fill all required fields (*)');
                quoteForm.reportValidity();
                return;
            }

            const formData = {
                name: quoteForm.querySelector('[name="name"]').value,
                phone: quoteForm.querySelector('[name="phone"]').value,
                service: quoteForm.querySelector('[name="serviceType"]').value,
                postcode: quoteForm.querySelector('[name="postcode"]').value,
                size: quoteForm.querySelector('[name="size"]').value || 'Not provided',
                email: quoteForm.querySelector('[name="email"]').value || 'Not provided'
            };

            const serviceNames = {
                'driveway': 'New Driveway',
                'fencing': 'Fencing',
                'sealing': 'Sealing & Cleaning',
                'repair': 'Repair & Refinish',
                'other': 'Other Work'
            };

            const message = `*Mr. Driveways - Quote Request*\n\n` +
                           `Name: ${formData.name}\n` +
                           `Phone: ${formData.phone}\n` +
                           `Service: ${serviceNames[formData.service] || formData.service}\n` +
                           `Area: ${formData.size} sq ft\n` +
                           `Postcode: ${formData.postcode}\n` +
                           `Email: ${formData.email}\n` +
                           `Location: Birmingham`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/447883555131?text=${encodedMsg}`, '_blank');
        });
    }

    // ========== FORM SUBMIT (FIXED) ==========
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                alert('Please fill all required fields');
                return;
            }
            
            const name = this.querySelector('[name="name"]').value;
            alert(`Thank you ${name}! Your quote request has been submitted. We will contact you within 24 hours.`);
            
            // Optional: Reset form
            // this.reset();
            // if (resultDisplay) resultDisplay.textContent = '';
        });
    }
});
