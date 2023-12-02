// PSEUDO CODE : I.Au clic sur le bouton de la barre de recherche, je veux que soient affichés seulement les livres dont le titre correspond à la recherche. II. Mais je veux que les résultats soient réinitialisés si je fais une nouvelle recherche. III. Si l'input est vide, tous les résultats s'affichent de nouveau sans cliquer sur le bouton.

const searchFunction = () => {
  const searchInput = document.querySelector("#search-input");

  const searchButton = document.querySelector("#search-btn");

  searchButton.addEventListener("click", (e) => {
    // I.
    const searchedByTheUser = searchInput.value.toLowerCase();

    const allBooksTitles = document.querySelectorAll(".book-title");

    for (let bookTitle of allBooksTitles) {
      const bookContainer = bookTitle.closest(".book-card");
      if (!bookTitle.innerText.toLowerCase().includes(searchedByTheUser)) {
        bookContainer.style.display = "none";

        //II.
      } else {
        bookContainer.style.display = "block";
      }
    }
  });

  searchInput.addEventListener("input", () => {
    const allBooksContainer = document.querySelectorAll(".book-card");
    if (searchInput.value.length === 0) {
      for (let book of allBooksContainer) {
        book.style.display = "block";
      }
    }
  });
};

export default searchFunction
