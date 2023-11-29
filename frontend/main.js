import VanillaTilt from 'vanilla-tilt';
import './assets/style.css';
import './utils/fetchBooksFromAPI.js';
import displayBooks from './utils/displayBooks.js';
import './frontJS/search.js'
import './frontJS/filter.js'

async function addBookCoversInTheContainer() {
  try {
    // ajouter les livres au container
    // document.getElementById('book-container').innerHTML =
    await displayBooks();

    // ajouter l'effet de tilt sur les couvertures des livres, uniquement ici car sinon appliqué avant l'ajout au DOM
    const allBookCovers = document.querySelectorAll('.book-cover');
    for (let book of allBookCovers) {
      VanillaTilt.init(book, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

addBookCoversInTheContainer();
