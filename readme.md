## What I learned :
-separate frontend and backend in different folders
-passing data from backend to frontend
-using Vite for frontend to benefits of Hot Module Replacement and imports logic
-HTML <template> functionnality


## In-depth details of the project :
### Backend
1.Goodreads CSV export because it doesn't provide API. Turned the CSV file into Goordreads.sqlite thanks to SQLite bash script.
2.Retrieving book cover image for each book : using a combination of SQL Query and a scrapping book cover library to get all cover images. Logic is getting the book cover Amazon URL depending on the ISBN13 and then cleaning the object.ISBN13 string. [getBookCovers.js](./backend/controllers/getBookCovers.js)
3.Querying SQL DB to get all books data to JS objects. Then passing the data to /data route thanks to Fastify [passBookDataToFront.js](./backend/controllers/passBookDataToFront.js)

### Frontend
4.Fetching the data from the /data route [fetchBooksFromAPI.js](./frontend/utils/fetchBooksFromAPI.js)
5.Then using <template> HTML functionnality to dynamically render the content. [displayBooks.js](/frontend/utils/displayBooks.js)