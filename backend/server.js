import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifySecureSession from '@fastify/secure-session'
import fastifyCookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 
import { dirname, join } from 'node:path';//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 

import { passBookDataToFront } from "./controllers/passBookDataToFront.js";

import { loginAction, logoutAction } from "./actions/auth.js";

import cors from '@fastify/cors'

import fastifyFormBody from "@fastify/formbody"

const app = fastify();

// SERVE STATIC FILES
const rootDir = (dirname(fileURLToPath(import.meta.url)));//car ESModules ne supporte pas pas path et __dirname

// CORS
await app.register(cors, { 
    origin: 'http://localhost:5173',
    methods: 'GET, POST',
    credentials: true, // Allow credentials (cookies)
})

// COOKIES
app.register(fastifyCookie)

// SECURE SESSION permet de créer un cookie signé sur le poste de l'utilisateur. Sécurisé car l'utilisateur ne pourra pas modifier le cookie, en effet seul notre serveur sera capable de générer un tel cookie.
app.register(fastifySecureSession, {
    cookieName: 'session',
    key: readFileSync(join(rootDir, 'secret-key')),
    cookie: {
        path: '/',
    }
})

// PERMETTRE LES SOUSMISSIONS PAR DEFAUT DE FORM
app.register(fastifyFormBody)

// HOMEPAGE ROUTE
app.get('/data', async (req, res) => {//it's the handler function
    try{
        const { sanitarizedRows, bookcovers } = await passBookDataToFront();
        const data = {
            sanitarizedRows : sanitarizedRows,
            bookcovers : bookcovers
        }
        res.send(data)// '/data' is the endpoint
    }catch(error){
        console.error(error)
    }
     
});

// AUTHENTICATION
app.post('/login', loginAction)
app.get('/logout', logoutAction)

// AUTHORIZATION
const isAuthenticated = async (req, res, next) => {
    // Check if the user is authenticated (you can customize this based on your authentication mechanism)
    if (req.session.user) {
      next(); // User is authenticated, proceed to the next middleware
    } else {
      res.status(401).json({ error: 'Unauthorized because user is not authenticated' }); 
    }
  };
  
// ADD BOOj route and pre-handler for verifying that user is authenticated before handling the req
app.route({
    method: 'POST',
    url: '/add-book',
    preHandler: isAuthenticated, // Apply the middleware here
    handler: async (req, res) => {
      try{
        const book = {
            bookTitle: req.body.titre,
            bookAuthor: req.body.auteur,
            bookCoverImg: req.body.couverture
        }
        console.log(book)
      }catch(error){
        console.error(error)
      }
      
    },
});

// START SERVER
const start = async () => {
    try{
        await app.listen({port: 3000});
        console.log('Server is running at 3000')
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

start()