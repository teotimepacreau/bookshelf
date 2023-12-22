import VanillaTilt from 'vanilla-tilt';
import './assets/style.css';
import './utils/fetchBooksFromAPI.js';
import displayBooks from './utils/displayBooks.js';


async function loadingOrder() {
  try {
    // ajouter les livres de la table goodreads au container
    await displayBooks();

    // ajouter les livres de la table bookviaform au container
    const {default: displayBooksAddedViaForm} = await import ('./utils/displayAddedViaFormBooks.js')
    await displayBooksAddedViaForm();
    
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

      const {default: login } = await import ('./frontJS/login.js')

      const {default: sorter} = await import ('./frontJS/sort.js')


      const {default: pagination} = await import ('./frontJS/pagination.js')

      const {default: reservation} = await import ('./frontJS/reservation.js')

      pagination()
      searchFunction();
      filterFunction();
      sorter();
      await login();
      reservation()

  } catch (error) {
    console.error(error);
  }
}

loadingOrder();
