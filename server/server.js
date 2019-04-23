const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

let io = socketIO(server);

io.on('connection', (client) => {

    console.log('Cliente conectado');

    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido'
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //Escuchar clientes
    client.on('enviarMensaje', (data, callback)=>{
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);

        // if(mensaje.usuario) {
        //     callback({
        //         resp: 'OK'
        //     });
        // } else {
        //     callback({
        //         resp: 'KO'
        //     });
        // }
    });

});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});