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
    const btn1M = document.getElementById('btn1M');
    const btn3M = document.getElementById('btn3M');
    const btn6M = document.getElementById('btn6M');
    const btn12M = document.getElementById('btn12M');
    const priceElements = document.querySelectorAll('.price-val');
    const periodElements = document.querySelectorAll('.period');

    // Remove all active classes
    toggleWrapper.classList.remove('active-1m', 'active-3m', 'active-6m', 'active-12m');
    [btn1M, btn3M, btn6M, btn12M].forEach(btn => btn.classList.remove('active'));

    // Add active class to toggle wrapper
    toggleWrapper.classList.add(`active-${type}`);
    
    let suffix = '/mo';
    if (type === '1m') {
        btn1M.classList.add('active');
        suffix = '/mo';
    } else if (type === '3m') {
        btn3M.classList.add('active');
        suffix = '/3mo';
    } else if (type === '6m') {
        btn6M.classList.add('active');
        suffix = '/6mo';
    } else if (type === '12m') {
        btn12M.classList.add('active');
        suffix = '/yr';
    }
    
    // Update prices and text suffix
    priceElements.forEach(el => {
        el.innerText = el.getAttribute(`data-${type}`);
    });
    periodElements.forEach(el => {
        el.innerText = suffix;
    });
}