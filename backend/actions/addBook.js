import fs from 'fs'
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';

const pump = promisify(pipeline);

import sqlite3 from "sqlite3";
import { open } from "sqlite";//wrapper for sqlite3
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
const dbFile = join(dbPath, "goodreads.db");

const addBook = async (req, res) => {
    try{
        const book = await req.file()
        console.log(book)
        if(book.file){
        await pump(book.file, fs.createWriteStream(`./uploads/${book.filename}`))
        }

        let db = await open({//db connexion
            filename: dbFile,
            driver: sqlite3.Database,
        });

        let addedBook = {
            title: book.fields.titre.value,
            author: book.fields.auteur.value,
            coverImgPath: `/uploads/${book.filename}`
          };

        await db.exec(`
            CREATE TABLE IF NOT EXISTS bookviaform (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                coverImgPath TEXT
            )`);

        await db.run(`INSERT INTO bookviaform (title, author, coverImgPath) VALUES (?, ?, ?)`, addedBook.title, addedBook.author, addedBook.coverImgPath)

        res.json(addedBook)

      }catch(error){
        console.error(error)
        res.status(500).send('server side error on adding book from the form')
      }
}

export default addBook