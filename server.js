const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const morgan = require('morgan');
const { server: config } = require('./config/config');

const app = express();

const page = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
    </head>
    <body>
        <div>This is the page</div>
        <button id='send-button'>Send Websocket Message</button>
        <script src='/public/main.js'></script>
    </body>
</html>
`;

app.use(morgan());

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send(page);
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received %s', message);
        handleMessage(ws, message);
    });

    ws.send('something');
});

const messageCache = [];

function handleMessage(ws, messageString) {
    const messageData = JSON.parse(messageString);

    switch(messageData.type) {
        case 'CLIENT-MESSAGE':
            messageCache.push(messageData.message);
            break;

        case 'SEND-ALL-TO-CLIENT':
            ws.send(JSON.stringify(messageCache));
            break;
    }
}

app.post('/send-message', (req, res) => {
    broadcastMessage('message initiated from web browser');
    res.status(200).send({ success: true });
});

server.listen(config, function listening() {
    console.log('Listening on %d', server.address().port);
});
