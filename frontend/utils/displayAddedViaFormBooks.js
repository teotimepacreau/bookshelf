

export default async function displayBooksAddedViaForm(){
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addedbookfromform`)
        if(response.ok) {
            const booksViaForm = await response.json()

            for(let book of booksViaForm){

            const cardTemplate = document.querySelector(
                "[data-card-template]"
              );

              const containerForAllCards = document.querySelector(
                "[data-container-for-all-cards]"
              );

              const card = cardTemplate.content.cloneNode(true); //récupère tout ce qui est à l'intérieur du template, fera un clone avec tout le contenu

              const img = card.querySelector("[data-img]");
              img.src = new URL(book.coverImgPath, `${import.meta.env.VITE_BACKEND_URL}`)

              const title = card.querySelector("[data-title]");
              title.textContent = book.title;

              const author = card.querySelector("[data-author]");
              author.textContent = book.author;

              containerForAllCards.insertBefore(card,containerForAllCards.firstChild);
            }
        }else{
            console.error('client side error')
        }
    }catch(error){
        console.error('server side error')
    }
}