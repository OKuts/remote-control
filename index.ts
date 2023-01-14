import {createWebSocketStream, WebSocketServer} from 'ws'

import {httpServer} from './src/http_server'
// import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = 8181

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

const wss = new WebSocketServer({port: 8080})

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false})

  duplex.on('data', async (chunk) => {
    try {
      const [command, px1, px2] = (`${chunk}`).split(' ')
      console.log(`Received: ${chunk}`)
      const [select, action] = command.split('_')

          switch (select) {
            case 'mouse':
              console.log(action, px1, px2)
              break;
            }
    } catch (err) {
      console.log('Some error')
    }
  })

  ws.on('close', () => {
    process.stdout.write('\nClosing websocket...\n');
    ws.close();
    wss.close();
    process.exit();
  });
})
