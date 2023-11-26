import fetchBooks from "./fetchBooksFromAPI.js"

export default async function displayBooks(){
    try{
        const { sanitarizedRows, bookcovers } = await fetchBooks(); 
        
        const cardTemplate = document.querySelector("[data-card-template]")

        const containerForAllCards = document.querySelector("[data-container-for-all-cards]")

        for(let row of sanitarizedRows){
            for(let book of bookcovers){
                if(book.ISBN13 === row.ISBN13){
                    const card = cardTemplate.content.cloneNode(true)//récupère tout ce qui est à l'intérieur du template, fera un clone avec tout le contenu

                    const img = card.querySelector("[data-img]")
                    img.src = book.BookCoverUrl

                    const title = card.querySelector("[data-title]")
                    title.textContent = row.Title

                    const author = card.querySelector("[data-author]")
                    author.textContent = row.Author

                    const publisher = card.querySelector("[data-publisher]")
                    publisher.textContent = row.Publisher

                    const averagerating = card.querySelector("[data-averagerating]")
                    averagerating.textContent = row.AverageRating

                    containerForAllCards.append(card)//attache la carte au container       `
                }
            }
        }
    }catch(error){
        console.error(error)
    }
}