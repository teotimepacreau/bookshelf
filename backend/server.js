import fastify from "fastify";
import fastifySecureSession from '@fastify/secure-session'
import fastifyCookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";

// UPLOAD FILES
import fastifyMultipart from "@fastify/multipart";


import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 
import { dirname, join } from 'node:path';//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 

import { passBookDataToFront } from "./controllers/passBookDataToFront.js";
import { passBookAddedViaFormToFront } from "./controllers/passBookAddedViaFormToFront.js"

import { loginAction, logoutAction } from "./actions/auth.js";
import addBook from "./actions/addBook.js";

import { reservation } from "./actions/reservation.js";

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

// UPLOAD DE FICHIERS
app.register(fastifyMultipart)

// PASS ADDEDBOOKVIAFORM COVER IMG TO FRONT
app.register(fastifyStatic, {
    root: join(rootDir, 'uploads'),
    prefix: '/uploads', // The URL prefix for accessing static files
})

// PASS BOOK DATA FROM SQL TABLE
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

// PASS BOOKADDEDVIAFORM DATA
app.get('/addedbookfromform', async (req, res) => {
    try{
        const bookAddedViaFormRows = await passBookAddedViaFormToFront()
        res.send(JSON.stringify(bookAddedViaFormRows))
    }catch(error){
        console.error(error)
    }
})

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

// ADD BOOK route and pre-handler for verifying that user is authenticated before handling the req
app.route({
    method: 'POST',
    url: '/addbook',
    preHandler: isAuthenticated, // Apply the middleware here
    handler: addBook //voir ./actions/addBook.js
});

app.post('/reservation', reservation)

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