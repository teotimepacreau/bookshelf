import VanillaTilt from 'vanilla-tilt';
import './assets/style.css';
import './utils/fetchBooksFromAPI.js';
import displayBooks from './utils/displayBooks.js';


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
      // Dynamically import search.js and filter.js after all the content is added to the page

      // {default: searchFunction} obligé car permet de dire à JS: va chercher la fonction exportée par défaut du module
      const { default: searchFunction } = await import('./frontJS/search.js');
      const { default: filterFunction } = await import('./frontJS/filter.js');
  
      searchFunction();
      filterFunction();

  } catch (error) {
    console.error(error);
  }
}

addBookCoversInTheContainer();
