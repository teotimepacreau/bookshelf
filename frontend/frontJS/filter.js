const filterFunction = () => {
  
  // FILTER ANIMATION
  const filterBtn = document.querySelector("#filter-button");

  const filtersContainer = document.querySelector("#all-filters-container");

  filterBtn.addEventListener("click", (e) => {
    filtersContainer.classList.toggle("filters-visible");

    const chevron = filterBtn.querySelector("i");
    chevron.classList.toggle("dropdown-icon");
  });

  // ACTIVATE CHECKBOX IF CLICK ON DIV
  const allStarCheckboxes = document.querySelectorAll(".star-checkboxes");

  allStarCheckboxes.forEach((item) => {
    const itemCheckbox = item.querySelector("input");

    item.addEventListener("click", (e) => {
      if (!e.target.matches("input")) {
        //je vérifie que le clic n'est pas sur la checkbox mais bien sur le container pour être sûr de ne pas empêcher la fonctionnalité native de la checkbox
        itemCheckbox.checked = !itemCheckbox.checked; //quand cliqué met l'attribute checked en l'inverse de son état précédent
        handleCheckboxChange(itemCheckbox)
      }
    });
    // ACTIVATE CHECKBOX FOR KEYBOARD USERS
    item.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        itemCheckbox.checked = !itemCheckbox.checked;
        handleCheckboxChange(itemCheckbox)
      }
    });
    item.addEventListener('change', ()=>{
        handleCheckboxChange(itemCheckbox)
    });
  });

  function handleCheckboxChange(itemCheckbox) {
    if(itemCheckbox.checked === true){
      const selectedRating = parseInt(itemCheckbox.value);
      console.log(selectedRating);
      filterBooksByRating(selectedRating);
    }else{
      const allBooksContainers = document.querySelectorAll(".book-card");
      allBooksContainers.forEach((item)=>{
        item.style.display = "block"
      })
    }
}

  // FILTER FUNCTION
  // PSEUDO CODE : au clic sur la checkbox je souhaite que seuls s'affichent les livres avec une note inférieure ou égale au chiffre du label de la checkbox
  // 1. attraper la valeur de la checkbox
  // 2. repartir de cette valeur et
  // function filterBooksByRating(selectedRating) {
  function filterBooksByRating(selectedRating) {
    const allBooksContainers = document.querySelectorAll(".book-card");
    allBooksContainers.forEach((bookContainer) => {
      const bookRating = parseInt(
        bookContainer.querySelector("[data-averagerating]").textContent.match(/(\d+)/)
      );//.match(/(\d+)/) est du REGEX qui permet de tirer seulement les chiffres
      console.log(bookRating);

      if (bookRating === selectedRating) {
        bookContainer.style.display = "block";
      } else {
        bookContainer.style.display = "none";
      }
    });
  }
};
export default filterFunction;
