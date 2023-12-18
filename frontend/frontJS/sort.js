
const sorter = () => {
  const allBooks = Array.from(document.querySelectorAll(".book-card")); //Array.from car sort ne fonctionne pas sur une NodeList

  const containerForAllCards = document.querySelector(
    "[data-container-for-all-cards]"
  );

  const sorter = document.querySelector('select[name="sort-by"]');
  sorter.addEventListener("change", (e) => {
    const value = e.target.value;
    switch (value) {
      case "Titre de A à Z":
        allBooks.sort((a, b) => {
          const titleA = a.querySelector(".book-title").innerText;
          const titleB = b.querySelector(".book-title").innerText;
          return titleA.localeCompare(titleB);
        });
        break;
      case "Titre de Z à A":
        allBooks.sort((a,b)=>{
          const titleA = a.querySelector(".book-title").innerText;
          const titleB = b.querySelector(".book-title").innerText;
          return titleA.localeCompare(titleB)
        })
        allBooks.reverse()
        break;
      case "Note croissante":
        console.log('case3')
        allBooks.sort((a,b)=>{
          const averageRatingA = parseFloat(a.querySelector('[data-averagerating]').innerText);//obligé de parseFloat car sinon compare les string au lieu des nb
          const averageRatingB = parseFloat(b.querySelector('[data-averagerating]').innerText);
          return averageRatingA - averageRatingB
        })
        break;
      case "Note décroissante":
        allBooks.sort((a,b)=>{
          const averageRatingA = parseFloat(a.querySelector('[data-averagerating]').innerText);//obligé de parseFloat car sinon compare les string au lieu des nb
          const averageRatingB = parseFloat(b.querySelector('[data-averagerating]').innerText);
          return averageRatingA - averageRatingB
        })
        allBooks.reverse()
        break;
    }
    // chaque case retourne l'array allBooks mutée à sa manière, il ne reste plus qu'à vider le HTML du container et le remplir avec l'array mutée
    containerForAllCards.innerHTML = ""
    allBooks.forEach((book)=>{
        containerForAllCards.appendChild(book)
    })
})
}
export default sorter;
