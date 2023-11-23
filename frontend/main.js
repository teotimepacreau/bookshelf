import './assets/style.css'
import './assets/fetchBooksFromAPI.js'

import displayBooks from './utils/displayBooks.js'
async function addBookCovers () {
    try {

      // Display books in the book-container
      document.getElementById('book-container').innerHTML = await displayBooks();
    } catch (error) {
      console.error(error);
    }
}
addBookCovers()

const { VanillaTilt } = await import('./assets/vanilla-tilt.js');

async function tilting (){
    await addBookCovers()
    // Initialize tilt effect for each book card
    const bookCovers = document.querySelectorAll('.book-cover');
    bookCovers.forEach((cover) => {
      VanillaTilt.init(cover, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    });
}
tilting()
    