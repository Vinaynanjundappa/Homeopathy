
document.addEventListener('DOMContentLoaded', function() {
  // Nav Bar Section Toggle Menu
  const dropdownButton = document.getElementById('dropdownMenuButton');
  if (dropdownButton) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownMenuContainer = dropdownButton.closest('.dropdown-menu-container');

    dropdownButton.addEventListener('click', function() {
      dropdownMenuContainer.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenuContainer.classList.remove('active');
      }
    });
  }

  // Book Appointment
  const appointmentDateInput = document.getElementById('appointmentDate');
  if (appointmentDateInput) {
    // Initialize Date Variables
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const formattedToday = today.toISOString().split('T')[0];
    const formattedNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).toISOString().split('T')[0];

    // Set min and max date for the appointment date input
    appointmentDateInput.setAttribute('min', formattedToday);
    appointmentDateInput.setAttribute('max', formattedNextMonth);

    // Handle form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        alert('Appointment booked successfully!');
        appointmentForm.reset(); // This resets the form fields
      });
    } else {
      console.error('Form with ID "appointmentForm" not found.');
    }
  }

  // Select Health Issue Type in Dropdown
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setHealthIssueType() {
    const HealthIssueType = getQueryParam('HealthIssueType');
    if (HealthIssueType) {
        const dropdown = document.getElementById('HealthIssueType');
        if (dropdown) {
            dropdown.value = HealthIssueType;
        }
    }
}

window.addEventListener('load', setHealthIssueType);

  // Testimonial Section
  const testimonials = document.querySelectorAll('.testimonial-content');
  if (testimonials.length > 0) {
    const dots = document.querySelectorAll('.dot');
    let currentTestimonialIndex = 0;
    let autoSlideInterval;

    // Function to show a testimonial based on index
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
          testimonial.classList.add('active');
          dots[i].classList.add('active');
        }
      });
    }

    // Function to show the previous testimonial
    function showPreviousTestimonial() {
      currentTestimonialIndex = (currentTestimonialIndex > 0) ? currentTestimonialIndex - 1 : testimonials.length - 1;
      showTestimonial(currentTestimonialIndex);
    }

    // Function to show the next testimonial
    function showNextTestimonial() {
      currentTestimonialIndex = (currentTestimonialIndex < testimonials.length - 1) ? currentTestimonialIndex + 1 : 0;
      showTestimonial(currentTestimonialIndex);
    }

    // Initialize the automatic slider interval
    function startAutoSlide() {
      autoSlideInterval = setInterval(showNextTestimonial, 3000); // Change every 3 seconds
    }

    // Stop the automatic slider interval
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Add event listeners for the arrows
    const leftArrowTestimonial = document.querySelector('.left-arrow');
    const rightArrowTestimonial = document.querySelector('.right-arrow');

    if (leftArrowTestimonial && rightArrowTestimonial) {
      leftArrowTestimonial.addEventListener('click', () => {
        stopAutoSlide(); // Optional: Stop automatic sliding on manual arrow click
        showPreviousTestimonial();
      });
      rightArrowTestimonial.addEventListener('click', () => {
        stopAutoSlide(); // Optional: Stop automatic sliding on manual arrow click
        showNextTestimonial();
      });
    } else {
      console.error('Testimonial arrows not found.');
    }

    // Add event listeners for the dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoSlide(); // Optional: Stop automatic sliding on manual dot click
        currentTestimonialIndex = index;
        showTestimonial(currentTestimonialIndex);
      });
    });

    // Start the automatic slider
    startAutoSlide();

    // Initialize the first testimonial
    showTestimonial(currentTestimonialIndex);
  }

  // Gallery Section
  const galleryGrid = document.querySelector('.gallery-grid');
  const leftArrowGallery = document.querySelector('.gallery-left-arrow');
  const rightArrowGallery = document.querySelector('.gallery-right-arrow');

  if (galleryGrid && leftArrowGallery && rightArrowGallery) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalItems = galleryItems.length;
    const itemsToShow = 4; // Number of items to show at once

    let currentGalleryIndex = 0;

    function updateGalleryPosition() {
      if (galleryItems.length === 0) return; // Guard clause
      const itemWidth = galleryItems[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(galleryGrid).gap) || 0;
      galleryGrid.style.transform = `translateX(-${currentGalleryIndex * (itemWidth + gap)}px)`;
    }

    function showNextGalleryItems() {
      if (currentGalleryIndex < totalItems - itemsToShow) {
        currentGalleryIndex++;
      } else {
        currentGalleryIndex = 0; // Loop back to the start
      }
      updateGalleryPosition();
    }

    function showPreviousGalleryItems() {
      if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
      } else {
        currentGalleryIndex = totalItems - itemsToShow; // Loop back to the end
      }
      updateGalleryPosition();
    }

    leftArrowGallery.addEventListener('click', showPreviousGalleryItems);
    rightArrowGallery.addEventListener('click', showNextGalleryItems);

    // Update gallery position on window resize
    window.addEventListener('resize', updateGalleryPosition);

    // Initialize the gallery position
    updateGalleryPosition();
  }

  // FAQ Section
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const button = item.querySelector('.toggle-button');

      question.addEventListener('click', () => {
        item.classList.toggle('active');
        button.textContent = item.classList.contains('active') ? '-' : '+';
      });
    });
  }
});


