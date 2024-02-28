
# The Bookshelf : my fullstack project with Fastify & SQLite backend + Vite frontend

https://github.com/teotimepacreau/bookshelf/assets/95431443/abe7cc46-e8e8-4aea-b136-cef312331d80

# 🛠️
Backend : NodeJS, Fastify, SQLite
Frontend : HTML, CSS, JS, VIte

# What I learned :
- separate frontend and backend in different folders
- working with ES Modules
- loading asynchronously ES Modules and scriptd thanks the import('') function [main.js](./frontend/main.js)
- passing data from backend to frontend via routes
- using pre-handler function to ensure only authenticated user can make a POST request
- using Vite for frontend to benefits of Hot Module Replacement and imports every module in one JS file logic
- fixing CORS issues (origin, methods, credentials)
- authentification through session secure cookies. Learned the difference betwen BasicAuth, SessionAuth and JWT
- encrypting credentials with BCRYPT in order to store in db
- authorization depending on the route thanks to pre-handler function (it's Fastify alternative to middleware)
- Scroll-Progress-Timeline CSS animation, to apply animation when element enter the viewport on scroll
- viewTransitions API to animate page movements
- using `<dialog>` Modal & Non-Modal
- HTML `<template>` functionnality

# In-depth details of the project :
## Backend
1. Goodreads CSV export because it doesn't provide API. Turned the CSV file into Goordreads.sqlite thanks to SQLite bash script.
2. Retrieving book cover image for each book : using a combination of SQL Query and a scrapping book cover library to get all cover images. Logic is getting the book cover Amazon URL depending on the ISBN13 and then cleaning the object.ISBN13 string. [getBookCovers.js](./backend/controllers/getBookCovers.js)
3. Querying SQL DB to get all books data to JS objects. Then passing the data to /data route thanks to Fastify [passBookDataToFront.js](./backend/controllers/passBookDataToFront.js)
## Frontend
4. Fetching the data from the /data route [fetchBooksFromAPI.js](./frontend/utils/fetchBooksFromAPI.js)
5. Then using <template> HTML functionnality to avoid using innerHTML for security and bugs. [displayBooks.js](./frontend/utils/displayBooks.js)
6. **Search** : allowing to search a particular book title, hiding results that d'ont math the input. Showing all results if no input entered. [search.js](./frontend/frontJS/search.js)

https://github.com/teotimepacreau/bookshelf/assets/95431443/945e0f9d-1225-4204-a588-5214fb169eb6


7. **Filter** : filter books by rating through checkboxes. If the checkbox is unchecked it returns to initial state.[filter.js](./frontend/frontJS/filter.js) 

https://github.com/teotimepacreau/bookshelf/assets/95431443/3204580d-b1fb-4a53-809b-7301e879b095


8. **Login**: <dialog> element contains the connexion form. username and password are passed to the backend endpoint "/login" [login.js](./frontend/frontJS/login.js)

https://github.com/teotimepacreau/bookshelf/assets/95431443/0d8fe432-eb20-42f8-874e-ae58946cabd1


9. **Sort**: allowing to sort by title or rate [sort.js](https://github.com/teotimepacreau/bookshelf/blob/v2/frontend/frontJS/sort.js)

https://github.com/teotimepacreau/bookshelf/assets/95431443/34df7fd6-29ae-4232-9609-cd363cebfce2


## Backend step 2
10. Authentification : Retrieving username and password. Hashing the password throught bcrypt. Then SQL query to get the corresponding username row in DB (table auth). Bcrypt compares if the in DB hashed password matched the hashed password passed by the connexion form. If match : it uses the fastify-secure-session plugin that adds a **session cookie**. A request to this session cookie allows to ensure if the user is authenticated. It then passes to frontend the confirmation that user is authenticated.[auth.js](./backend/actions/auth.js)
11. Authorization : only authenticated user that have a session-cookie are allowed to make a POST request by filling the addbook form.[addBook.js](./backend/actions/addBook.js)
12. Adding the book data provided through the form to the db and passing it to frontend trhough "/addedbookfromform" route [server.js](./backend/server.js)
## Frontend step 2
13. Adding book to the collection : when addBookForm is received it visually adds the book to the page, and adds it to the DB. At reload : it combines "goodreads" & "bookviaform" table [displayAddedViaFormBooks.js](./frontend/utils/displayAddedViaFormBooks.js)
14. Logout function : clicking on the logout notif delete the session cookie, disallow to add a book to the collection and hides the add book button
15. Pagination : displaying only a limited amount of books card, setting dynamically a button for each page, styling the active button, displaying books between a certain range for each page. [pagination.js](./frontend/frontJS/pagination.js)
16. Reservation : allowing to reserve a book. When clicking on the dedicated button it adds it to a modal. Then user select the date to return and validate. Data is sent to the backend and added to the DB. The book now appears as reserved and it visually inform other users. [reservation.js](./frontend/frontJS/reservation.js)

https://github.com/teotimepacreau/bookshelf/assets/95431443/20245525-6c76-45a2-880c-281f8f7dd71b


17. Deployment : backend on [fly.io](https://fly.io/) in order to have persistent storage of SQLite DB, frontend on [Vercel](https://vercel.com/) which directly recognizes Vite
