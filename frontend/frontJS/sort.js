
const sorter = () => {
  const allBooks = Array.from(document.querySelectorAll(".book-card")); //Array.from car sort ne fonctionne pas sur une NodeList
  console.log(allBooks);

  const containerForAllCards = document.querySelector(
    "[data-container-for-all-cards]"
  );

  const sorter = document.querySelector('select[name="sort-by"]');
  sorter.addEventListener("change", (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    switch (value) {
      case "Titre de A à Z":
        console.log("case1");
        allBooks.sort((a, b) => {
          const titleA = a.querySelector(".book-title").innerText;
          const titleB = b.querySelector(".book-title").innerText;
          return titleA.localeCompare(titleB);
        });
        break;
      case "Titre de Z à A":
        console.log("case2");
        break;
      case "Note croissante":
        break;
      case "Note décroissante":
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
