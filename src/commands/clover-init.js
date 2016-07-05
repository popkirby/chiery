import jsonfile from 'jsonfile'
import log from '../utils/log'
import path from 'path'

export const command = 'clover-init'
export const desc = 'init clover.json in current directory'
export const builder = {
}

export const handler = () => {
  log.chiery('create clover.json')
  const defaultCloverJson = {
    'link': {}
  }

  jsonfile.writeFileSync(path.join(process.cwd(), 'clover.json'), defaultCloverJson)

  log.chiery('successfully created clover.json')
} 
