document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Scroll Animations (Intersection Observer)
       ========================================= */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply staggered transition delays for grid cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        // Base delay + staggered index delay
        card.style.transitionDelay = `${index * 100}ms`;
        scrollObserver.observe(card);
    });

    // Observe header elements
    document.querySelectorAll('.section-header .animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });


    /* =========================================
       Modal Functionality
       ========================================= */
    const modal = document.getElementById('serviceModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // Open Modal and populate data
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent opening if clicking specifically on something else, 
            // though in this design the whole card is clickable
            
            // Get data attributes from the clicked card
            const title = card.getAttribute('data-title');
            const iconClass = card.getAttribute('data-icon');
            const desc = card.getAttribute('data-desc');

            // Populate Modal
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            // Update icon classes (reset first, then add new)
            modalIcon.className = `fa-solid ${iconClass}`;

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close Button Click
    closeModalBtn.addEventListener('click', closeModal);

    // Close on Outside Click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
