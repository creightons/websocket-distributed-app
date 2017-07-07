const WebSocket = require('ws');

const { client: config } = require('./config/config');

require('ssl-root-cas').inject();

const url = `ws://${config.url}`;
const ws = new WebSocket(url);

ws.on('open', function open() {
    ws.send('something');
});

ws.on('message', function incoming(data) {
    console.log(data);
});
