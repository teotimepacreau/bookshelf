// OBJECTIF : transformer en objet JS les tables goodreads et bookcovers
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESmodules path et __dirname ne fonctionnent pas

export async function passBookAddedViaFormToFront() {
  
  // Calculate the path to your SQLite database file
  const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
  const dbFile = join(dbPath, "goodreads.db");

  let db = await open({
    //db connexion
    filename: dbFile,
    driver: sqlite3.Database,
  });

  const bookAddedViaFormRows = await db.all("SELECT * FROM bookviaform");
  console.log(bookAddedViaFormRows)

  return bookAddedViaFormRows
}
