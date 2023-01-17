import {Region, screen} from '@nut-tree/nut-js'
import Jimp from 'jimp'
import {Duplex} from 'stream'

export const makeScreenshot = async (command: string, cb: Duplex) => {
  const screenHeight = await screen.height()
  const region = new Region(0, 0, screenHeight, screenHeight)
  const src = await screen.grabRegion(region)
  new Jimp(src)
    .resize(200, 200)
    .getBase64(Jimp.MIME_JPEG, (err, data) => {
      if (!err) {
        cb.write(`${command} ${data.split(',')[1]}`)
      }
    })
}
