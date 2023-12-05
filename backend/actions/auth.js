import bcrypt from "bcrypt"
import sqlite3 from "sqlite3";
import { open } from "sqlite";//wrapper for sqlite3
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
const dbFile = join(dbPath, "goodreads.db");

export const loginAction = async (req, res) => {
        try{
                const username = req.body.username
                const password = req.body.password
                console.log(username, password)

                // hash le mdp de l'utilisateur
                const passHash = await bcrypt.hash(password, 1)
                console.log('passHash:', passHash)

                let db = await open({//db connexion
                        filename: dbFile,
                        driver: sqlite3.Database,
                });
                
                // INIT AN ADMIN ACCOUNT
                // async function addCredentials(username, passHash){
                //         try{
                //         await db.run("BEGIN TRANSACTION;");
                //         await db.exec(`
                //                 CREATE TABLE IF NOT EXISTS auth (
                //                         id INTEGER PRIMARY KEY,
                //                         username NOT NULL,
                //                         password NOT NULL
                //                 )
                //         `)
                //         await db.run(
                //                 "INSERT INTO auth (username, password) VALUES (?,?)", username, passHash
                //         )
                //         await db.run("COMMIT;");
                // }catch(error){
                //         console.error(error)
                // }
                // }

                // requête SQL pour retourner en objet la row correspondant au username
                const searchForUser = await db.all("SELECT * FROM auth WHERE username = ?", username)
                console.log('searchForUser', searchForUser)

                //  bcrypt compare si le mdp hashé de la BDD correspond au mdp hashé au mdp hashé de l'utilisateur
                if(await bcrypt.compare(password, searchForUser[0].password)){
                        // envoie au frontend
                        res.send({auth: true})
                }else{  
                        // envoie au frontend
                        res.send({auth: false})
                }
        }catch(error){
                console.error(error)
                res.send({auth: false})
        }
}

