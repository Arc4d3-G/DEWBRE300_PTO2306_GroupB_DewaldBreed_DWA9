import { books, authors, BOOKS_PER_PAGE } from '../src/data.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
<style>
* {
  box-sizing: border-box;
}

.preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

<!-- .preview:hover {
  background: rgba(var(--color-blue), 0.05);
} -->

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}
</style>

<button class="preview">
  <img class="preview__image" data-img src=""/>
  <div class="preview__info" data-info>
    <h3 class="preview__title" data-title></h3>
    <div class="preview__author" data-author></div>
  </div>
</button>
`;

export class PreviewCard extends HTMLElement {
  inner = this.attachShadow({ mode: 'closed' });

  elements = {
    preview: undefined,
    img: undefined,
    info: undefined,
    title: undefined,
    author: undefined,
  };

  data = {
    author: undefined,
    title: undefined,
    id: undefined,
    image: undefined,
    published: undefined,
    description: undefined,
  };

  constructor({ author, title, id, image, published, description }) {
    super();
    this.data.author = author;
    this.data.title = title;
    this.data.id = id;
    this.data.image = image;
    this.data.published = published;
    this.data.description = description;

    const { content } = template;

    this.inner.appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    this.elements = {
      preview: this.inner.querySelector('[data-preview]'),
      img: this.inner.querySelector('[data-img]'),
      info: this.inner.querySelector('[data-info'),
      title: this.inner.querySelector('[data-title'),
      author: this.inner.querySelector('[data-author'),
    };

    this.setAttribute('data-preview', this.data.id);
    this.elements.title.innerText = this.data.title;
    this.elements.img.src = this.data.image;
    this.elements.author.innerText = authors[this.data.author];
  }
}

customElements.define('preview-card', PreviewCard);
