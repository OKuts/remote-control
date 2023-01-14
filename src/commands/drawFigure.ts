import {Button, down, left, mouse, Point, right, up} from '@nut-tree/nut-js'

export const drawFigure = async (figure: string, px1: string, px2 = '') => {
  const value = Number(px1)
  const value2 = px2 ? Number(px2) : value
  if (figure === 'circle') {
    mouse.config.autoDelayMs = 50
    mouse.config.mouseSpeed = 500
    const point = await mouse.getPosition()
    for (let i = 0; i <= Math.PI; i += 0.1) {
      if (i > 0) {
        await mouse.pressButton(Button.LEFT)
      }
      const newPoint = {x: point.x + (value * Math.cos(i)), y: point.y + (value * Math.sin(i))}
      await mouse.move([newPoint])
    }
    for (let i = 0; i <= Math.PI; i += 0.1) {
      await mouse.pressButton(Button.LEFT)
      const newPoint = {x: point.x - (value * Math.cos(i)), y: point.y - (value * Math.sin(i))}
      await mouse.move([newPoint])
    }
  } else {
    await mouse.releaseButton(Button.LEFT)
    await mouse.pressButton(Button.LEFT)
    await mouse.move(right(value))
    await mouse.move(down(value2))
    await mouse.move(left(value))
    await mouse.move(up(value2))
  }
  await mouse.releaseButton(Button.LEFT)
}
