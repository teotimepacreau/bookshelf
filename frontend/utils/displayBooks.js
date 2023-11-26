import fetchBooks from "./fetchBooksFromAPI.js"

export default async function displayBooks(){
    try{
        const { sanitarizedRows, bookcovers } = await fetchBooks(); 
        
        const cardTemplate = document.querySelector("[data-card-template]")

        const containerForAllCards = document.querySelector("[data-container-for-all-cards]")

        // let result = ''
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

                    containerForAllCards.append(card)//attache la carte au container

                    // result+=`
                    //         <article class="book-card">
                    //                 <div class="book-cover-parent">
                    //                     <img class="book-cover" src=${book.BookCoverUrl} />
                    //                 </div>
                    //                 <section class="book-details">
                    //                     <h2 class="book-title">${row.Title}</h2>
                    //                     <ul class="book-details-list">
                    //                         <li>Author: ${row.Author}</li>
                    //                         <li>Publisher: ${row.Publisher}</li>
                    //                         <li>Average Rating (Goodreads): ${row.AverageRating}</li>
                    //                     </ul>
                    //                 </section>
                    //         </article>
                    //         `
                }
            }
        }
        // return result
    }catch(error){
        console.error(error)
    }
}