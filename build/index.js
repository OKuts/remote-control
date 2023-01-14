"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_server_1 = require("./src/http_server");
const mouseNavigate_1 = require("./src/commands/mouseNavigate");
// import { mouse } from "@nut-tree/nut-js";
const HTTP_PORT = 8181;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
http_server_1.httpServer.listen(HTTP_PORT);
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
    const duplex = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf8', decodeStrings: false });
    duplex.on('data', async (chunk) => {
        try {
            const [command, px1, px2] = (`${chunk}`).split(' ');
            console.log(`Received: ${chunk}`);
            const [select, action] = command.split('_');
            console.log(select, action);
            switch (select) {
                case 'mouse':
                    const message = await (0, mouseNavigate_1.getMouseActionMessage)(px1);
                    duplex.write(`${command} ${message}`, 'utf-8');
                    break;
            }
        }
        catch (err) {
            console.log('Some error');
        }
    });
    ws.on('close', () => {
        process.stdout.write('\nClosing websocket...\n');
        ws.close();
        wss.close();
        process.exit();
    });
});
