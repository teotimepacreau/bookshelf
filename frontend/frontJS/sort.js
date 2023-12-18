const sorter = () => {
  let initialBooksArray = Array.from(document.querySelectorAll(".book-card")); //Array.from car sort ne fonctionne pas sur une NodeList

  let result = undefined; //on ouvre le let result pour pouvoir ensuite le remplit avec toSorted() pour ne pas muter l'array initiale

  const containerForAllCards = document.querySelector(
    "[data-container-for-all-cards]"
  );

  const sorter = document.querySelector('select[name="sort-by"]');
  sorter.addEventListener("change", (e) => {
    const value = e.target.value;
    switch (value) {
      case "Trier-defaut":
        result = initialBooksArray;
        break;
      case "Titre de A à Z":
        result = initialBooksArray.toSorted((a, b) => {
          const titleA = a.querySelector(".book-title").innerText;
          const titleB = b.querySelector(".book-title").innerText;
          return titleA.localeCompare(titleB);
        });
        break;
      case "Titre de Z à A":
        result = initialBooksArray.toSorted((a, b) => {
          const titleA = a.querySelector(".book-title").innerText;
          const titleB = b.querySelector(".book-title").innerText;
          return titleB.localeCompare(titleA);
        });
        break;
      case "Note croissante":
        result = initialBooksArray.toSorted((a, b) => {
          const averageRatingA = parseFloat(
            a.querySelector("[data-averagerating]").innerText
          ); //obligé de parseFloat car sinon compare les string au lieu des nb
          const averageRatingB = parseFloat(
            b.querySelector("[data-averagerating]").innerText
          );
          return averageRatingA - averageRatingB;
        });
        break;
      case "Note décroissante":
        result = initialBooksArray.toSorted((a, b) => {
          const averageRatingA = parseFloat(
            a.querySelector("[data-averagerating]").innerText
          ); //obligé de parseFloat car sinon compare les string au lieu des nb
          const averageRatingB = parseFloat(
            b.querySelector("[data-averagerating]").innerText
          );
          return averageRatingB - averageRatingA;
        });
        break;
    }
    // chaque case retourne l'array result changée à sa manière, sans toucher à l'initialBooksArray, il ne reste plus qu'à vider le HTML du container et le remplir avec result    containerForAllCards.innerHTML = "";
    result.forEach((book) => {
      containerForAllCards.appendChild(book);
    });
  });
};
export default sorter;
