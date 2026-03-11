/**
 * Elite Auto Detailing Studio - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close Mobile Menu on Link Click
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Sticky Header on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };

  // Trigger once on load
  revealOnScroll();
  // Trigger on scroll
  window.addEventListener('scroll', revealOnScroll);

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current
        item.classList.toggle('active');
      });
    }
  });

  // Lightbox functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close"><i class="fa-solid fa-xmark"></i></span>
      <img src="" alt="Enlarged Image">
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Before/After Slider Functionality
  const baSliders = document.querySelectorAll('.ba-slider');
  if (baSliders.length > 0) {
    baSliders.forEach(slider => {
      const beforeDiv = slider.querySelector('.ba-before');
      const beforeImg = slider.querySelector('.ba-before img');
      const range = slider.querySelector('input[type="range"]');
      const handle = slider.querySelector('.slider-handle');

      const updateSlider = () => {
        const val = range.value;
        beforeDiv.style.width = `${val}%`;
        handle.style.left = `${val}%`;
        if (beforeImg) {
          beforeImg.style.width = `${slider.offsetWidth}px`;
        }
      };

      range.addEventListener('input', updateSlider);
      window.addEventListener('resize', updateSlider);
      
      // Initial call to set sizes
      setTimeout(updateSlider, 100);
    });
  }
});
