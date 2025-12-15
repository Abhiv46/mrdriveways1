/* -------------------------------------------------
   script.js – Mr. Driveways website
   Features:
   1️⃣ Validate the quote form (HTML5 does most of it)
   2️⃣ Create a pre‑filled WhatsApp message
   3️⃣ Open WhatsApp (web or app) in a new tab
   4️⃣ Optional: clear the form after sending
------------------------------------------------- */

/* ---- Helper: URL‑encode text ---- */
function encodeForUrl(text) {
    return encodeURIComponent(text);
}

/* ---- Build the WhatsApp message from form fields ---- */
function buildWhatsAppMessage(formData) {
    const lines = [
        '*नया कोट अनुरोध*',
        `नाम: ${formData.name}`,
        `ई‑मेल: ${formData.email}`,
        `फ़ोन: ${formData.phone}`,
        `प्रोजेक्ट आकार (sq ft): ${formData.size}`,
        `पैटर्न: ${formData.pattern}`
    ];
    return lines.join('\n');
}

/* ---- Click handler for the "WhatsApp पर भेजें" button ---- */
document.getElementById('whatsappBtn').addEventListener('click', () => {
    const form = document.getElementById('quoteForm');

    // Ensure required fields are filled (HTML5 validation fallback)
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Gather data
    const formData = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        phone:   form.phone.value.trim(),
        size:    form.size.value,
        pattern: form.pattern.value
    };

    // Build message and encode it
    const message      = buildWhatsAppMessage(formData);
    const encodedMsg   = encodeForUrl(message);

    // Your WhatsApp number in international format (no +, no spaces)
    const yourNumber   = '447883555131';

    // Open WhatsApp in a new tab/window
    const waUrl = `https://wa.me/${yourNumber}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');

    // Optional: reset the form after opening WhatsApp
    form.reset();
});

/* -------------------------------------------------
   OPTIONAL: If you later want to send the data to a
   backend (e.g., Netlify Functions or Vercel API),
   you can use fetch like this:

   async function sendToBackend(data) {
       await fetch('/api/quote', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
       });
   }
   ------------------------------------------------- */
