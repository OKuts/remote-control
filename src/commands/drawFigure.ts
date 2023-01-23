import {Button, mouse } from '@nut-tree/nut-js'

export const drawFigure = async (figure: string, px1: string, px2 = '') => {
  const value = Number(px1)
  const value2 = px2 ? Number(px2) : value
  mouse.config.mouseSpeed = 50
  const point = await mouse.getPosition()
  if (figure === 'circle') {
    const point = await mouse.getPosition()
    for (let i = 0; i <= Math.PI; i += 0.1) {
      if (i > 0 && i < 0.2) await mouse.pressButton(Button.LEFT)
      const newPoint = {x: point.x + (value * Math.cos(i)), y: point.y + (value * Math.sin(i))}
      await mouse.move([newPoint])
    }
    for (let i = 0; i <= Math.PI; i += 0.1) {
      const newPoint = {x: point.x - (value * Math.cos(i)), y: point.y - (value * Math.sin(i))}
      await mouse.move([newPoint])
    }
   } else {
    await mouse.pressButton(Button.LEFT)
    await mouse.move([{x: point.x + value, y: point.y}])
    await mouse.move([{x: point.x + value, y: point.y + value2}])
    await mouse.move([{x: point.x, y: point.y + value2}])
    await mouse.move([{x: point.x, y: point.y}])
  }
  await mouse.releaseButton(Button.LEFT)
}
