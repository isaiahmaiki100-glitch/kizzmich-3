const categoryData = {
  business: {
    title: 'Business Suits',
    description: 'Executive tailoring for boardroom presence, meetings and city events. Structured, modern and exceptionally fitted.',
    images: [1, 2, 3, 4, 5, 6]
  },
  wedding: {
    title: 'Wedding Suits',
    description: 'Signature groom wear designed for refined ceremony style, polished silhouettes and memorable luxury.',
    images: [1, 2, 3, 4, 5, 6]
  },
  prom: {
    title: 'Prom Suits',
    description: 'Modern statement tailoring with refined details and elevated finishing for unforgettable evenings.',
    images: [1, 2, 3, 4, 5, 6]
  },
  bespoke: {
    title: 'Bespoke Fit',
    description: 'Made-to-measure tailoring shaped to your body, lifestyle and personal style with exceptional craftsmanship.',
    images: [1, 2, 3, 4, 5, 6]
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

  const heroSection = document.querySelector('.category-hero');
  if (heroSection) {
    const heroImage = `images/categories/${categoryKey}/1.jpg`;
    heroSection.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.85)), url('${heroImage}')`;
  }

  grid.innerHTML = category.images
    .map((index) => {
      const path = `images/categories/${categoryKey}/${index}.jpg`;
      return `
        <article class="category-card category-card-large reveal">
          <div class="category-card-media">
            <img src="${path}" alt="${category.title} image ${index}" loading="lazy" onerror="this.src='images/placeholder.svg'" />
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
