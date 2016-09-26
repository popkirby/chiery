import chieryDir from '../utils/chiery-dir'
import jsonfile from 'jsonfile'
import path from 'path'

export const command = 'list'
export const desc = 'List clovers'
export const builder = {
}

export const handler = (args) => {
  const cloversListPath = path.join(chieryDir, './clovers_list.json')
  const cloversList = jsonfile.readFileSync(cloversListPath)
 
  console.log(Object.keys(cloversList).join('\n'))
} 
