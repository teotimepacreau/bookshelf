import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifySecureSession from '@fastify/secure-session'
import fastifyCookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 
import { dirname, join } from 'node:path';//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 

import { passBookDataToFront } from "./controllers/passBookDataToFront.js";

import { loginAction } from "./actions/auth.js";

import cors from '@fastify/cors'

const app = fastify();

// SERVE STATIC FILES
const rootDir = (dirname(fileURLToPath(import.meta.url)));//car ESModules ne supporte pas pas path et __dirname

// CORS
await app.register(cors, { 
    origin: 'http://localhost:5173',
    methods: 'GET, POST',
    credentials: true, // Allow credentials (cookies)
})

app.register(fastifyCookie)

// SECURE SESSION permet de créer un cookie signé sur le poste de l'utilisateur. Sécurisé car l'utilisateur ne pourra pas modifier le cookie, en effet seul notre serveur sera capable de générer un tel cookie.
app.register(fastifySecureSession, {
    cookieName: 'session',
    key: readFileSync(join(rootDir, 'secret-key')),
    cookie: {
        path: '/',
    }
})

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