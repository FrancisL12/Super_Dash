/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
document.addEventListener('DOMContentLoaded', () => {
    // Slider elements
    // FIX: Cast NodeList elements to HTMLImageElement to access the 'src' property.
    const slides = document.querySelectorAll<HTMLImageElement>('.slider-container .slide');
    const sliderContainer = document.querySelector('.slider-container');
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    // FIX: Cast modal image element to HTMLImageElement to access the 'src' property.
    const modalImg = document.getElementById('modalImage') as HTMLImageElement;
    const closeBtn = document.querySelector('.modal .close');
    const prevBtn = document.querySelector('.modal .prev');
    const nextBtn = document.querySelector('.modal .next');

    // Early return if essential elements are not found
    if (!slides.length || !sliderContainer || !modal || !modalImg || !closeBtn || !prevBtn || !nextBtn) {
        console.error("Slider or modal elements not found.");
        return;
    }

    let currentSlide = 0;
    const slideIntervalTime = 3000; // 3 seconds
    let slideInterval;

    // --- SLIDER LOGIC ---
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        stopSlider(); // Ensure no multiple intervals are running
        slideInterval = window.setInterval(nextSlide, slideIntervalTime);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // --- MODAL LOGIC ---
    let modalIndex = 0;

    function showModalImage(index) {
        modalIndex = index;
        if (slides[modalIndex]) {
            modalImg.src = slides[modalIndex].src;
        }
    }
    
    function openModal() {
        modal.style.display = 'flex';
        showModalImage(currentSlide);
        stopSlider();
    }

    function closeModal() {
        modal.style.display = 'none';
        startSlider();
    }
    
    // --- EVENT LISTENERS ---
    sliderContainer.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    prevBtn.addEventListener('click', () => {
        const newIndex = (modalIndex - 1 + slides.length) % slides.length;
        showModalImage(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (modalIndex + 1) % slides.length;
        showModalImage(newIndex);
    });

    // Close modal on outside click (on the modal backdrop)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // --- INITIALIZATION ---
    showSlide(currentSlide);
    startSlider();
    console.log("SuperDash landing page and interactive image slider initialized.");
});