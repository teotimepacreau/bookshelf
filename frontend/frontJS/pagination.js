const pagination = async ()=>{
    const allBooksCardArray = Array.from(document.querySelectorAll('.book-card'))
    console.log(allBooksCardArray)
// PSEUDO CODE : j'ai un array de 120 livres. je veux afficher seulement les 12 premiers livres. Pour chaque paquet de 12 livres je veux un nouveau bouton de pagination. A la page 3, je veux skipper les 24 premiers livres
    const postsPerPage = 12
    let page = 1
    const lengthOfAllBooksCardArray = allBooksCardArray.length
    console.log(lengthOfAllBooksCardArray)

    const pagerContainer = document.querySelector('#pager-container')
    
    async function generatePageBtns() {
        const numberOfPages = Math.ceil(lengthOfAllBooksCardArray / postsPerPage);
    
        for (let i = 1; i <= numberOfPages; i++) {
          const pageBtn = document.createElement('button');
          pageBtn.classList.add('page-btn');
          pageBtn.innerText = i;
          pagerContainer.appendChild(pageBtn);
        }
      }
    await generatePageBtns()
    const allPageBtns = document.querySelectorAll('.page-btn')

    allPageBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          let pageNumber = parseInt(btn.innerText);
    
          allBooksCardArray.forEach((book, index) => {
            // Calculate the lower and upper bounds of the range
            const lowerBound = (pageNumber - 1) * postsPerPage;
            const upperBound = pageNumber * postsPerPage - 1;
    
            // Show or hide books based on the range
            if (index >= lowerBound && index <= upperBound) {
              book.style.display = 'block';
            } else {
              book.style.display = 'none';
            }
          });
        });
      });

    
}
export default pagination