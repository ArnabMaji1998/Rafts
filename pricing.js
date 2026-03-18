// --- Accordion Logic ---
function togglePricing(header) {
    const currentItem = header.parentElement;
    const currentBody = currentItem.querySelector('.acc-body');
    const isActive = currentItem.classList.contains('active');

    // Close all
    document.querySelectorAll('.acc-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.acc-body').style.maxHeight = null;
    });

    // Open clicked
    if (!isActive) {
        currentItem.classList.add('active');
        currentBody.style.maxHeight = currentBody.scrollHeight + "px";
    }
}

// --- Toggle Billing Logic ---
function setBilling(type) {
    const toggleWrapper = document.getElementById('billingToggle');
    const btnAnnual = document.getElementById('btnAnnual');
    const btnMonthly = document.getElementById('btnMonthly');
    const priceElements = document.querySelectorAll('.price-val');

    if (type === 'monthly') {
        toggleWrapper.classList.add('monthly-active');
        btnMonthly.classList.add('active');
        btnAnnual.classList.remove('active');
        
        // Update to monthly prices
        priceElements.forEach(el => {
            el.innerText = el.getAttribute('data-monthly');
        });
    } else {
        toggleWrapper.classList.remove('monthly-active');
        btnAnnual.classList.add('active');
        btnMonthly.classList.remove('active');
        
        // Update to annual prices
        priceElements.forEach(el => {
            el.innerText = el.getAttribute('data-annual');
        });
    }
}