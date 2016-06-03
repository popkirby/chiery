import chieryDir from '../utils/chieryDir'
import fs from 'fs'
import path from 'path'

export const command = 'list'
export const desc = 'List clovers'
export const builder = {
}

export const handler = () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(chieryDir, 'package.json')))
  const config = packageJson.dependencies

  console.info(Object.keys(config).join('\n'))
} 
