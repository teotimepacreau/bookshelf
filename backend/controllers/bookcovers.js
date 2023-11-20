// OBJECTIF : récupérer les bookcovers des livres de la DB goodreads et les stocker dans la table bookcovers
//REF FOR SCRAPPING AMAZON BOOK COVERS : https://github.com/e-e-e/bookcovers/blob/master/src/services/amazon_books/amazon_books.js

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import bookcovers from "bookcovers";//SCRAPPING BOOKCOVERS IMAGE API

// Calculate the path to your SQLite database file
const dbPath = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const dbFile = join(dbPath, "goodreads.db");

let db = await open({//db connexion
  filename: dbFile,
  driver: sqlite3.Database,
});

await db.run("BEGIN TRANSACTION;");//permet d'informer SQLite qu'on va procéder à un traitement complexe sur la DB afin de gagner du temps

async function getBooksISBN13() {
  try {
    //TO ACTIVATE IF WANTED await db.run("DROP TABLE IF EXISTS bookcovers");

    const rows = await db.all("SELECT ISBN13 FROM goodreads");

    const filteredArray = rows.filter((obj) => {
      //conserve que les rows avec un ISBN13 pas vide et qui contient au moins un chiffre
      const isbn13 = obj.ISBN13;
      return isbn13 !== "" && /\d/.test(isbn13);
    });

    function cleanISBN13(isbn13) {
      // Remove double quotes and any other unwanted characters
      return isbn13.replace(/["=]/g, "");
    }

    //créer table bookcovers
    await db.exec(`
      CREATE TABLE IF NOT EXISTS bookcovers (
          id INTEGER PRIMARY KEY,
          ISBN13 TEXT NOT NULL,
          BookCoverUrl TEXT
      );
    `);

    for (let row of filteredArray) {
      try {
        row.ISBN13 = cleanISBN13(row.ISBN13);//applique le cleaning pour enlever les doubles quotes et caractères non voulus

        const bookCoversData = await bookcovers //appliquer l'API de scrapping pour récupérer l'url de la book cover
          .withIsbn(row.ISBN13)
          .then((data) => {
            return data;
          });

        if (bookCoversData.amazon && bookCoversData.amazon["3x"] !== null) {
          row.bookCoverUrl = bookCoversData.amazon["3x"];//on récupère que les images en taille 3x qui existent bien
        } else {
          continue; // Proceed to the next ISBN13 row if there's an issue
        }

        console.log(row);

        try {
          await db.run(
            "INSERT INTO bookcovers (ISBN13, BookCoverUrl) VALUES (?, ?)",
            row.ISBN13,
            row.bookCoverUrl
          );
        } catch (dbError) {
          console.error("Error inserting into the database:", dbError);
        }
      } catch (error) {
        console.error("Error fetching book cover:", error);
        // Continue to the next ISBN
        continue;
      }
    }
  } catch (error) {
    console.error("Error in database operation:", error);
  }
}

await db.run("COMMIT;");

//ACTIVATE IF NEEDED getBooksISBN13();
