// PSEUDO CODE : j'ai un array de 120 livres. je veux afficher seulement les 12 premiers livres. Pour chaque paquet de 12 livres je veux un nouveau bouton de pagination. A la page 3, je veux skipper les 24 premiers livres

const pagination = async () => {
  const allBooksCardArray = Array.from(document.querySelectorAll(".book-card"));
  const booksPerPage = 12;
  const lengthOfAllBooksCardArray = allBooksCardArray.length;

  const pagerContainer = document.querySelector("#pager-container");

  async function generatePageBtns() {
    const numberOfPages = Math.ceil(lengthOfAllBooksCardArray / booksPerPage); //je divise le nombre totals de livres par le nombre livres par page pour avoir mon nombres de pages

    for (let i = 1; i <= numberOfPages; i++) {
      //genère un bouton pour chaque page
      const pageBtn = document.createElement("button");
      pageBtn.classList.add("page-btn");
      pageBtn.innerText = i; //le chiffre du bouton prend l'index
      pagerContainer.appendChild(pageBtn);
    }
  }
  await generatePageBtns();

  const allPageBtns = document.querySelectorAll(".page-btn");

  //   1 seul bouton de stylé à la fois
  function setActiveButton(btn) {
    const activeBtn = document.querySelector(".btn-active");
    if (activeBtn) {
      activeBtn.classList.remove("btn-active");
    }
    btn.classList.add("btn-active");
  }

  allPageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.startViewTransition(() => {
        setActiveButton(btn); //style le bouton actif
        let pageNumber = parseInt(btn.innerText);
        allBooksCardArray.forEach((book, index) => {
          const limiteBasseDeLivreASkipper = (pageNumber - 1) * booksPerPage;
          const limiteHauteDeLivreASkipper = pageNumber * booksPerPage - 1;

          if (
            index >= limiteBasseDeLivreASkipper &&
            index <= limiteHauteDeLivreASkipper
          ) {
            book.style.display = "flex";
          } else {
            book.style.display = "none";
          }
        });
        window.scrollTo(top)
      });
    });
  });
 
  // Afficher la page 1 au démarrage
  allPageBtns[0].click();
};
export default pagination;
