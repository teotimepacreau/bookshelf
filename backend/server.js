import fastify from "fastify";
import fastifyView from "@fastify/view";
import nunjucks from "nunjucks"

import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 
import { dirname, join } from 'node:path';//CAR EN MODULE IMPORT path et __dirname ne fonctionnent pas 

import { displayBooks } from "./controllers/displaybooks.js";

const app = fastify();

// SERVE STATIC FILES
const rootDir = (dirname(fileURLToPath(import.meta.url)));//car ESModules ne supporte pas pas path et __dirname

// HOMEPAGE ROUTE
app.get('/data', async (req, res) => {//it's the handler function
    try{
        const { sanitarizedRows, bookcovers } = await displayBooks();
        const data = {
            sanitarizedRows : sanitarizedRows,
            bookcovers : bookcovers
        }
        reply.send(data)// '/data' is the endpoint
    }catch(error){
        console.error(error)
    }
     
});

// START SERVER
const start = async () => {
    try{
        await app.listen({port: 3000});
        console.log('Server is running at 3030')
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

start()