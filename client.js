const WebSocket = require('ws');

const { client: config } = require('./config/config');

const url = `ws://${config.url}`;
const ws = new WebSocket(url);

ws.on('open', function open() {
    console.log('Connected to server \n\n');
});

ws.on('message', function incoming(data) {
    console.log();
    console.log();
    console.log('Data from server:');
    console.log(data);
    console.log();
});

ws.on('error', err => {
    console.log('Error: ', err)
    process.exit();
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
}); 

function display() {
    console.log();
    console.log('Websocket Client Options: ');
    console.log('-------------------------');
    console.log('- (S)end record to server');
    console.log('- (G)et all records from server');
    console.log('- (E)xit');

    rl.question('Choose an option: ', handleOption);
}

function handleOption(option) {
    console.log(); // New line

    switch(option) {
        case 'S':
        case 's':
            sendMessage();
            break;

        case 'G':
        case 'g':
            getMessages();
            break;

        case 'E':
        case 'e':
            console.log('exiting...');
            process.exit();
            break;

        default:
            console.log('Invalid Option');
            display();
    }

}

function sendMessage() {
    rl.question('Enter a message to send: ', message => {
        const data = {
            type: 'CLIENT-MESSAGE',
            message,
        };

        ws.send(JSON.stringify(data));

        display();
    });
}

function getMessages() {
    const data = { type: 'SEND-ALL-TO-CLIENT' };
    ws.send(JSON.stringify(data));
    display();
}

display();
