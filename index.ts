import {createWebSocketStream, WebSocketServer} from 'ws'

import {httpServer} from './src/http_server'
import {getMouseActionMessage} from './src/commands/mouseNavigate'
import {drawFigure} from './src/commands/drawFigure'

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
          const message = await getMouseActionMessage(action, px1)
          duplex.write(message ? `${command} ${message}` : command, 'utf-8')
          break

        case 'draw':
          drawFigure(action, px1, px2)
          duplex.write(command)
          break

        case 'prnt':
          duplex.write(command)
          break
      }
    } catch (err) {
      console.log('Some error')
    }
  })

  ws.on('close', () => {
    process.stdout.write('\nClosing websocket...\n')
    ws.close()
    wss.close()
    process.exit()
  })
})
