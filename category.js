const categoryData = {
  business: {
    title: 'Business Suits',
    description: 'Executive tailoring for boardroom presence, meetings and city events. Structured, modern and exceptionally fitted.',
    images: [
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.46%20PM%20(1).jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.47%20PM%20(2).jpeg',
      'suit%20pictures/WhatsApp%20Image%202026-07-18%20at%202.01.11%20AM.jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.49%20PM%20(1).jpeg'
    ]
  },
  wedding: {
    title: 'Wedding Suits',
    description: 'Signature groom wear designed for refined ceremony style, polished silhouettes and memorable luxury.',
    images: [
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.46%20PM%20(2).jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.47%20PM%20(3).jpeg',
      'suit%20pictures/WhatsApp%20Image%202026-07-18%20at%202.13.20%20AM%20(1).jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.49%20PM%20(2).jpeg'
    ]
  },
  prom: {
    title: 'Prom Suits',
    description: 'Modern statement tailoring with refined details and elevated finishing for unforgettable evenings.',
    images: [
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.46%20PM%20(3).jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.47%20PM%20(1).jpeg',
      'suit%20pictures/WhatsApp%20Image%202026-07-18%20at%202.13.21%20AM%20(1).jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.49%20PM%20(3).jpeg'
    ]
  },
  bespoke: {
    title: 'Bespoke Fit',
    description: 'Made-to-measure tailoring shaped to your body, lifestyle and personal style with exceptional craftsmanship.',
    images: [
      'images/about.jpg',
      'images/hero.jpg',
      'suit%20pictures/WhatsApp%20Image%202026-07-18%20at%202.01.12%20AM.jpeg',
      'images/WhatsApp%20Image%202026-07-07%20at%202.51.50%20PM%20(1).jpeg'
    ]
  }
};

function getCategoryKey() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('cat');
  return categoryData[category] ? category : 'business';
}

function renderCategoryPage() {
  const categoryKey = getCategoryKey();
  const category = categoryData[categoryKey];
  const title = document.getElementById('categoryTitle');
  const heading = document.getElementById('categoryHeading');
  const description = document.getElementById('categoryDescription');
  const grid = document.getElementById('categoryGrid');
  const heroSection = document.querySelector('.hero-media');

  if (!category || !grid || !title || !heading || !description) return;

  title.textContent = category.title;
  heading.textContent = `The finest ${category.title} collection.`;
  description.textContent = category.description;
  document.title = `${category.title} | Kizz Mich`;

  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (metaDescription) {
    metaDescription.setAttribute('content', category.description);
  }
  if (ogTitle) {
    ogTitle.setAttribute('content', `Kizz Mich | ${category.title}`);
  }
  if (ogDescription) {
    ogDescription.setAttribute('content', `Explore premium ${category.title.toLowerCase()} with luxury tailoring from Kizz Mich.`);
  }

  if (heroSection) {
    heroSection.innerHTML = `<img src="${category.images[0]}" alt="${category.title} showcase" loading="eager" />`;
  }

  grid.innerHTML = category.images
    .map((path) => {
      return `
        <article class="category-card reveal">
          <div class="category-card-media">
            <img src="${path}" alt="${category.title} showcase" loading="lazy" />
          </div>
          <div class="category-card-copy">
            <h3>${category.title}</h3>
            <p>${category.description}</p>
          </div>
        </article>
      `;
    })
    .join('');
}

if (document.body && document.getElementById('categoryGrid')) {
  renderCategoryPage();
}
