import {FileType, screen} from '@nut-tree/nut-js'
import Jimp from 'jimp';
import {Duplex} from "stream";

export const makeScreenshot = async (command: string, cb: Duplex) => {
  console.log('hello')
  const path = await screen.capture('1', FileType.JPG)
  return await Jimp.read(path, (err, lenna) => {
    if (err) throw err;
    lenna
      .resize(200, 200) // resize
      .getBase64(Jimp.MIME_JPEG, (err,data)=>{
        if (!err) {
          cb.write(`${command} ${data.split(',')[1]}`)
        }
      })
  });
}
