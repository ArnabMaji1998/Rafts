document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating once to keep the state
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Number Counters
    const counters = document.querySelectorAll('.counter');
    const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString('en-US');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('en-US');
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    counters.forEach(counter => metricObserver.observe(counter));

    // 3. Floating Widget Toggle
    const widgetToggle = document.getElementById('widgetToggle');
    const widgetMenu = document.querySelector('.widget-menu');
    if (widgetToggle) {
        widgetToggle.addEventListener('click', () => {
            widgetMenu.classList.toggle('active');
            widgetToggle.classList.toggle('active');
        });
    }


    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items (optional, remove if you want multiple open)
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const content = faq.querySelector('.faq-content');
                    if (content) content.style.display = 'none';
                    const icon = faq.querySelector('.faq-icon');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'chevron-down');
                    }
                });

                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.faq-content');
                    if (content) content.style.display = 'block';
                    const icon = item.querySelector('.faq-icon');
                    if (icon) {
                        icon.setAttribute('data-lucide', 'chevron-up');
                    }
                }

                // Re-render the specific icon that changed
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        }
    });

    // 5. Execution Section 3D Card Stack Animation
    const executionCards = document.querySelectorAll('#execCardStack .stacked-ui-card');
    if (executionCards.length === 3) {
        // cards start with pos-1, pos-2, pos-3 classes
        const classes = ['stack-pos-1', 'stack-pos-2', 'stack-pos-3'];

        setInterval(() => {
            executionCards.forEach(card => {
                // Find current class
                let currentClass = classes.find(c => card.classList.contains(c));
                if (currentClass) {
                    let currentIndex = classes.indexOf(currentClass);
                    // Move to the next class in the array (pos-1 -> pos-2, pos-2 -> pos-3, pos-3 -> pos-1)
                    // Wait, requirement is: "2nd card comes to top, 1st goes to last"
                    // pos-1 is top, pos-2 is middle, pos-3 is bottom.
                    // Card that had pos-1 should get pos-3. Card that had pos-2 gets pos-1. Card that had pos-3 gets pos-2.
                    // So pos-1 -> pos-3
                    // pos-2 -> pos-1
                    // pos-3 -> pos-2
                    let newIndex;
                    if (currentIndex === 0) newIndex = 2; // pos-1 -> pos-3
                    else if (currentIndex === 1) newIndex = 0; // pos-2 -> pos-1
                    else if (currentIndex === 2) newIndex = 1; // pos-3 -> pos-2

                    card.classList.remove(currentClass);
                    card.classList.add(classes[newIndex]);
                }
            });
        }, 1000); // 1 seconds interval
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

