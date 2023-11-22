// OBJECTIF : transformer en objet JS les tables goodreads et bookcovers
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESmodules path et __dirname ne fonctionnent pas

export async function displayBooks() {
  
  // Calculate the path to your SQLite database file
  const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
  const dbFile = join(dbPath, "goodreads.db");

  let db = await open({
    //db connexion
    filename: dbFile,
    driver: sqlite3.Database,
  });

  const rows = await db.all("SELECT * FROM goodreads");
  const bookcovers = await db.all("SELECT * FROM bookcovers");

  const cleanedDataFromGoodreadsTable = rows.filter((obj) => {
    //conserve que les rows avec un ISBN13 pas vide et qui contient au moins un chiffre
    const isbn13 = obj.ISBN13;
    return isbn13 !== "" && /\d/.test(isbn13);
  });

  function cleanISBN13(isbn13) {
    // Remove double quotes and any other unwanted characters
    return isbn13.replace(/["=]/g, "");
  }

  for (let row of cleanedDataFromGoodreadsTable) {
    try {
      row.ISBN13 = cleanISBN13(row.ISBN13); //applique le cleaning pour enlever les doubles quotes et caractères non voulus
    } catch (err) {
      console.error(err);
    }
  }

  const sanitarizedRows = cleanedDataFromGoodreadsTable;

  return {
    sanitarizedRows,
    bookcovers,
  };
}
