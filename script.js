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

window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  setTimeout(() => {
    loader?.classList.add('hidden');
  }, 450);
});

const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.progress-bar');
const backToTop = document.querySelector('.back-to-top');
const heroImage = document.querySelector('.hero-media img');

const updateHeader = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  header?.classList.toggle('scrolled', scrollTop > 40);
  backToTop?.classList.toggle('visible', scrollTop > 600);

  if (heroImage) {
    const offset = Math.min(scrollTop * 0.08, 22);
    heroImage.style.transform = `translateY(${offset}px) scale(1.04)`;
  }
};

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('load', updateHeader);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

mobileOverlay?.addEventListener('click', () => {
  navLinks?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
});

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

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
    if (formMessage) {
      formMessage.textContent = 'Please complete the form with a valid email address.';
    }
    return;
  }

  if (formMessage) {
    formMessage.textContent = 'Thank you for reaching out. We will be in touch soon.';
  }
  contactForm.reset();
});

const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.getAttribute('data-image');
    const alt = card.getAttribute('data-alt') || '';
    if (lightboxImage) {
      lightboxImage.src = image;
      lightboxImage.alt = alt;
    }
    galleryLightbox?.classList.add('open');
    galleryLightbox?.setAttribute('aria-hidden', 'false');
  });
});

lightboxClose?.addEventListener('click', () => {
  galleryLightbox?.classList.remove('open');
  galleryLightbox?.setAttribute('aria-hidden', 'true');
});

galleryLightbox?.addEventListener('click', (event) => {
  if (event.target === galleryLightbox) {
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', (event) => {
  if (!galleryLightbox?.classList.contains('open')) return;
  if (event.key === 'Escape') {
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
  }
});
