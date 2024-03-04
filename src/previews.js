import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { getElement } from './scripts.js';

const setOverlay = ({ author, title, id, image, published, description }) => {
  getElement('list-blur').src = image;
  getElement('list-image').src = image;
  getElement('list-title').innerText = title;
  getElement('list-subtitle').innerText = `${authors[author]} (${new Date(
    published
  ).getFullYear()})`;
  getElement('list-description').innerText = description;
};

/**
 * Utility function to find a specific element by it's data attribute from an event path
 * array.
 * @param {Array} nodeArray
 * @param {String} dataAttr
 * @returns {Element}
 */
const getElementFromEventPath = (nodeArray, dataAttr) => {
  let result = null;
  for (const node of nodeArray) {
    if (node.dataset[dataAttr] || node.dataset[dataAttr] === '') {
      result = node;
      break;
    }
  }
  return result;
};
/**
 * @param {Array} nodeArray - accepts any event path array
 * @returns {Object} active -  matching book object
 */
const setSingleBook = (previewId) => {
  let active = null;
  for (const singleBook of books) {
    if (singleBook.id === previewId) {
      active = singleBook;
      break;
    }
  }
  return active;
};

/**
 * Generates data for the preview overlay by creating an array from the event path and then
 * searching through each node until the active node is found. It then checks if the active node
 * has a dataset of "preview", in which case it then searches through the {@link books} object for a
 * matching {@link id} and then inserts the data to the element.
 */
export const generatePreviewOverlayData = (event) => {
  if (event.target.className === 'list__items') {
    return;
  } else {
    const pathArray = Array.from(event.path || event.composedPath());
    const activePreview = getElementFromEventPath(pathArray, 'preview');
    const previewId = activePreview.dataset.preview;
    const singleBook = setSingleBook(previewId);
    if (singleBook) {
      setOverlay(singleBook);
    } else return;
  }
};
