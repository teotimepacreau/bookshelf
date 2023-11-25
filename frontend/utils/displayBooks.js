import fetchBooks from "./fetchBooksFromAPI.js"

export default async function displayBooks(){
    try{
        const { sanitarizedRows, bookcovers } = await fetchBooks();        
        let result = ''
        for(let row of sanitarizedRows){
            for(let book of bookcovers){
                if(book.ISBN13 === row.ISBN13){
                    result+=`
                            <article class="book-card">
                                    <div class="book-cover-parent">
                                        <img class="book-cover" src=${book.BookCoverUrl} />
                                    </div>
                                    <section class="book-details">
                                        <h2 class="book-title">${row.Title}</h2>
                                        <ul class="book-details-list">
                                            <li>Author: ${row.Author}</li>
                                            <li>Publisher: ${row.Publisher}</li>
                                            <li>Average Rating (Goodreads): ${row.AverageRating}</li>
                                        </ul>
                                    </section>
                            </article>
                            `
                }
            }
        }
        return result
    }catch(error){
        console.error(error)
    }
}