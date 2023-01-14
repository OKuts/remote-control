import {screen} from '@nut-tree/nut-js'

export const getNewPoint = async (prevX: number, prevY: number, dx: number, dy: number) => {
  const newX = prevX + dx
  const newY = prevY + dy
  const width =  await screen.width()
  const height =  await screen.height()
  const x = newX < 0 ? 0 : newX > width ? width : newX
  const y = newY < 0 ? 0 : newY > height ? height : newY

  return {x, y}
}
