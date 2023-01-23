import {mouse} from '@nut-tree/nut-js'
import {getNewPoint} from '../utils/getNewPoint'

export const getMouseActionMessage = async (action: string, delta = '0'): Promise<string>=> {
  const {x, y} = await mouse.getPosition()
  if (action === 'position') return `${x},${y}`

  const direction = action === 'up' || action === 'left' ? -1 : 1
  const dx = action === 'up' || action === 'down' ? 0 : +delta * direction
  const dy = action === 'right' || action === 'left' ? 0 : +delta * direction
  const point = await getNewPoint(x, y, dx, dy)
  await mouse.setPosition(point)

  return ''
}
