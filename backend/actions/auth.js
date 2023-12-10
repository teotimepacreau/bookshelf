import bcrypt from "bcrypt"
import sqlite3 from "sqlite3";
import { open } from "sqlite";//wrapper for sqlite3
import { fileURLToPath } from "node:url"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
import { dirname, join } from "node:path"; //CAR EN ESModules  path et __dirname ne fonctionnent pas
const dbPath = dirname(dirname(fileURLToPath(import.meta.url)));
const dbFile = join(dbPath, "goodreads.db");



export const loginAction = async (req, res) => {
        try{
                const user = {
                        username: req.body.username,
                        password: req.body.password
                }
                // hash le mdp de l'utilisateur
                const passHash = await bcrypt.hash(user.password, 1)

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
                const searchForUser = await db.all("SELECT * FROM auth WHERE username = ?", user.username)

                //  bcrypt compare si le mdp hashé de la BDD correspond au mdp hashé au mdp hashé de l'utilisateur
                if(await bcrypt.compare(user.password, searchForUser[0].password)){
                        await req.session.set('user', {
                                username: user.username,
                        })
                        res.send({ user: req.session.get('user')});
                }else{  
                        // envoie au frontend
                        res.send({ user: false})
                }
        }catch(error){
                console.error(error)
                res.send({user: false})
        }
}

export const logoutAction = async (req, res) => {
        try{
                await req.session.delete()
                console.log(req.session)
                res.status(200).clearCookie('session', { path: '/' }).send({ message: 'Logout successful' });
        }catch(error){
                console.error(error)
        }
}
