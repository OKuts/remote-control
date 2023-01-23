import {createWebSocketStream, WebSocketServer} from 'ws'

import {httpServer} from './src/http_server'
import {getMouseActionMessage, drawFigure, makeScreenshot} from './src/commands'

const HTTP_PORT = 8181

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

const wss = new WebSocketServer({port: 8080})
console.log('wss.address: ', wss.address())


wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false})
  console.log('Client connected.')

  duplex.on('data', async (chunk) => {
    try {
      const [command, value1, value2] = (`${chunk}`).split(' ')
      console.log(`Received: ${chunk}`)
      const [select, action] = command.split('_')

      switch (select) {
        case 'mouse':
          const message = await getMouseActionMessage(action, value1)
          duplex.write(message ? `${command} ${message}` : command, 'utf-8')
          break

        case 'draw':
          drawFigure(action, value1, value2)
          duplex.write(command)
          break

        case 'prnt':
          makeScreenshot(command, duplex)
          break
      }
    } catch (err) {
      console.log('Some error')
    }
  })

  ws.on('close', () => {
    process.stdout.write('\nClient disconnected\n')
  })

})
process.on('SIGINT', () => {
  console.log('WebSocketServer stopped...')
  wss.close()
  process.exit()
})
