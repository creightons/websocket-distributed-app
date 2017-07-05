const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const { server: config } = require('./config/config');

const app = express();

app.use((req, res) => res.send({ msg: 'hello' }));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received %s', message);
    });

    ws.send('something');
});

server.listen(config, function listening() {
    console.log('Listening on %d', server.address().port);
});
