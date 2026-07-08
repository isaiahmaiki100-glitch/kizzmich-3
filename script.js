// Smoothly fade content into view on scroll.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Loader animation.
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => {
    loader?.classList.add('hidden');
  }, 450);
});

// Sticky navigation and progress.
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.progress-bar');
const backToTop = document.querySelector('.back-to-top');

const updateHeader = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  header.classList.toggle('scrolled', scrollTop > 40);
  backToTop.classList.toggle('visible', scrollTop > 600);
};

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('load', updateHeader);

// Mobile navigation toggle.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Animated counters.
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number(entry.target.dataset.count);
        const duration = 1200;
        const startTime = performance.now();

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          entry.target.textContent = Math.floor(progress * target).toString();
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            entry.target.textContent = target.toString();
          }
        };

        requestAnimationFrame(step);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Back to top button.
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form validation.
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const message = formData.get('message')?.toString().trim() || '';
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !phone || !message || !isEmailValid) {
    formMessage.textContent = 'Please complete the form with a valid email address.';
    return;
  }

  formMessage.textContent = 'Thank you for reaching out. We will be in touch soon.';
  contactForm.reset();
});

// Gallery and lightbox.
const responsiveGalleryImages = [
  {
    src: 'images/gallery-1.jpg',
    srcset: 'images/gallery-1-480.jpg 480w, images/gallery-1-900.jpg 900w',
    alt: 'Bespoke tailoring fabric and premiere finish details'
  },
  {
    src: 'images/gallery-2.jpg',
    srcset: 'images/gallery-2-480.jpg 480w, images/gallery-2-900.jpg 900w',
    alt: 'Luxury Threads Studio bespoke collection preview'
  },
  {
    src: 'images/gallery-3.jpg',
    srcset: 'images/gallery-3-480.jpg 480w, images/gallery-3-900.jpg 900w',
    alt: 'Tailor working with fine premium materials'
  },
  {
    src: 'images/gallery-4.jpg',
    srcset: 'images/gallery-4-480.jpg 480w, images/gallery-4-900.jpg 900w',
    alt: 'Elegant finished pieces presented in a refined showroom'
  },
  {
    src: 'images/gallery-5.jpg',
    srcset: 'images/gallery-5-480.jpg 480w, images/gallery-5-900.jpg 900w',
    alt: 'Modern couture design details and textured fabrics'
  },
  {
    src: 'images/gallery-6.jpg',
    srcset: 'images/gallery-6-480.jpg 480w, images/gallery-6-900.jpg 900w',
    alt: 'High-end tailoring workshop atmosphere'
  }
];

const whatsappGalleryImages = [
  'images/WhatsApp Image 2026-07-07 at 2.51.41 PM.jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.46 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.46 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.46 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.47 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.47 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.47 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.47 PM (4).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.48 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.48 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.49 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.49 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.49 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.49 PM.jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.50 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.50 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.50 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.50 PM (4).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.50 PM.jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.51 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.51 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.51 PM (3).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.51 PM.jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.52 PM (1).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.52 PM (2).jpeg',
  'images/WhatsApp Image 2026-07-07 at 2.51.52 PM (3).jpeg'
];

const galleryItems = [...responsiveGalleryImages, ...whatsappGalleryImages.map((src) => ({ src, alt: src.replace(/images\//, '').replace(/[-_]/g, ' ').replace(/\.jpeg$/i, '') }))];

const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');
let activeIndex = 0;

function createGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = galleryItems
    .map((item, index) => {
      if (item.srcset) {
        return `
          <figure class="gallery-item" tabindex="0" data-index="${index}">
            <picture>
              <source srcset="${item.srcset}" sizes="(max-width: 760px) 100vw, 32vw" />
              <img src="${item.src}" alt="${item.alt}" loading="lazy" />
            </picture>
          </figure>
        `;
      }

      return `
        <figure class="gallery-item" tabindex="0" data-index="${index}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        </figure>
      `;
    })
    .join('');
}

function openLightbox(index) {
  activeIndex = index;
  const image = galleryItems[activeIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.classList.remove('open');
}

function showNextImage() {
  activeIndex = (activeIndex + 1) % galleryItems.length;
  openLightbox(activeIndex);
}

function showPrevImage() {
  activeIndex = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(activeIndex);
}

galleryGrid?.addEventListener('click', (event) => {
  const item = event.target.closest('.gallery-item');
  if (!item) return;
  openLightbox(Number(item.dataset.index));
});

galleryGrid?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const item = event.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(Number(item.dataset.index));
  }
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxNext?.addEventListener('click', showNextImage);
lightboxPrev?.addEventListener('click', showPrevImage);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNextImage();
  if (event.key === 'ArrowLeft') showPrevImage();
});

createGallery();

// Testimonial slider.
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialItems = Array.from(document.querySelectorAll('.testimonial-card'));
const testimonialPrev = document.querySelector('.testimonial-nav.prev');
const testimonialNext = document.querySelector('.testimonial-nav.next');
let testimonialIndex = 0;

function updateTestimonials() {
  if (!testimonialTrack || testimonialItems.length === 0) return;
  const cardWidth = testimonialItems[0].getBoundingClientRect().width;
  const gap = 16;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;
  testimonialPrev.disabled = testimonialIndex === 0;
  testimonialNext.disabled = testimonialIndex >= testimonialItems.length - 1;
}

testimonialPrev?.addEventListener('click', () => {
  testimonialIndex = Math.max(0, testimonialIndex - 1);
  updateTestimonials();
});

testimonialNext?.addEventListener('click', () => {
  testimonialIndex = Math.min(testimonialItems.length - 1, testimonialIndex + 1);
  updateTestimonials();
});

window.addEventListener('resize', updateTestimonials);
window.addEventListener('load', updateTestimonials);

// Smooth section reveal on load.
window.addEventListener('DOMContentLoaded', () => {
  updateTestimonials();
});
