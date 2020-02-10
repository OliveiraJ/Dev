'use strict'

const http = require('http');
const express = require('express');
const debug = require('debug')('nodestr:server');

const app = express();
const port = normalizePort(process.env.PORT || "3000 ");
app.set('port',port);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', (req,res,next)=>{
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});
app.use('/', route);

server.listen(port);
server.on('error', OnError);
console.log('API rodando na porta'+port);

//Retirada do gerador de código do Express
function normalizePort(val){
    const port = parseInt(val,10);

    if(isNaN(port)){
        return val;
    }

    if(port >=0){
        return port;
    }

    return false;
}

//Tbm retirada do express

function OnError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port=== 'string' ?
    'Pipe ' + port: 
    'Pipe ' + port;

    switch(error.code){
        case 'EACCES':
            console.error(bind +'require elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind+' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}