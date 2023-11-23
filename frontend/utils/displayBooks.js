import fetchBooks from "../assets/fetchBooksFromAPI.js"

export default async function displayBooks(){
    try{
        const { sanitarizedRows, bookcovers } = await fetchBooks();
        console.log('sanitarizedRows object from displayBooks.js',sanitarizedRows, 'bookcovers object from displayBooks.js', bookcovers)
        
        let result = ''
        for(let row of sanitarizedRows){
            for(let book of bookcovers){
                if(book.ISBN13 === row.ISBN13){
                    result+=`
                            <article className="book-card">
                                    <div className="book-cover-parent">
                                        <img data-tilt data-tilt-glare data-tilt-scale="1.1" data-tilt-max-glare="0.9" data-tilt-perspective="500" className="book-cover" src=${book.BookCoverUrl} />
                                    </div>
                                    <section className="book-details">
                                        <h2>${row.Title}</h2>
                                        <ul className="book-details-list">
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