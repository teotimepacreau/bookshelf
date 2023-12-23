import sqlite3 from "sqlite3";
import { open } from "sqlite"; //wrapper for sqlite3
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
const dbFile = join(dbPath, "goodreads.db");

export const reservation = async (req, res) => {
  try {
    // const reservation = {
    //     title: req.body.title,
    //     date: req.body.date
    // }
    console.log(req.body);

    let db = await open({
      //db connexion
      filename: dbFile,
      driver: sqlite3.Database,
    });

    // await db.run(//ajoute la colonne date
    //     `
    //     ALTER TABLE goodreads
    //     ADD date TEXT
    //     `
    // )

    const insertDate = async () => {
      for (let item of req.body) {
        //SQLite does not have a storage class set aside for storing dates and/or times. Instead, the built-in Date And Time Functions of SQLite are capable of storing dates and times as TEXT, REAL, or INTEGER values: TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS").
        await db.run(
            `
            UPDATE goodreads SET date = ? WHERE Title = ?
            `,[item.date, item.title]
        );
      }
    };
    insertDate();
  } catch (error) {
    console.error(error);
  }
};
