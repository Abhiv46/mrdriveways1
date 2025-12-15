document.addEventListener('DOMContentLoaded', function() {
    console.log('Mr. Driveways website loaded...');

    // MOBILE MENU
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // *** NAYA FEATURE: AREA CALCULATOR ***
    const calcButton = document.getElementById('sizeCalculatorBtn');
    const sizeInput = document.getElementById('projectSize');
    const resultDisplay = document.getElementById('sizeResult');

    if (calcButton) {
        calcButton.addEventListener('click', function() {
            const sqftValue = parseFloat(sizeInput.value);
            
            if (isNaN(sqftValue) || sqftValue <= 0) {
                resultDisplay.textContent = '❌ Kripya sahi Square Feet number daalen.';
                resultDisplay.style.color = '#dc3545';
            } else {
                // Conversion: 1 sq ft = 0.092903 sq m
                const sqmValue = (sqftValue * 0.09290304).toFixed(2);
                resultDisplay.innerHTML = `✅ <strong>${sqftValue} sq ft</strong> barabar hai approx <strong>${sqmValue} m²</strong> ke.`;
                resultDisplay.style.color = '#004085';
            }
        });
    }

    // WHATSAPP QUOTE FUNCTION
    document.getElementById('whatsappBtn')?.addEventListener('click', function() {
        const form = document.getElementById('quoteForm');
        if (!form.checkValidity()) {
            alert('Kripya saare required fields fill karein.');
            form.reportValidity();
            return;
        }

        const formData = {
            name: form.name.value,
            phone: form.phone.value,
            service: form.serviceType.value,
            size: form.size.value || 'Not provided'
        };

        const message = `*NEW QUOTE REQUEST - Mr. Driveways*\n\n` +
                       `Name: ${formData.name}\n` +
                       `Phone: ${formData.phone}\n` +
                       `Service Needed: ${formData.service}\n` +
                       `Project Size: ${formData.size} sq ft\n` +
                       `Location: Birmingham Area\n` +
                       `_Website se aaya hai ye message._`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/447883555131?text=${encodedMsg}`, '_blank');
        
        // Optional: Form reset karna
        // form.reset();
        // if (resultDisplay) resultDisplay.textContent = '';
    });

    // FORM SUBMIT (agar backend pe bhejna ho to)
    document.getElementById('quoteForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Shukriya! Aapka FREE quote request submit ho gaya. Hum jaldi hi aapse contact karenge.');
        // Yahan aap is data ko apne server pe bhejne ke liye fetch() use kar sakte hain
    });
});
