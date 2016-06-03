import chieryDir from './chieryDir'
import fs from 'fs'
import log from './log'
import path from 'path'

function getClover(clover_name) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(chieryDir, 'package.json')))
  const clovers = Object.keys(packageJson.dependencies)

  let clover_path = ''
  // search for clover_name
  for (let clover of clovers) {
    if (clover === clover_name) {
      clover_path = clover
      break
    }

    let app_name = clover.split('/')[1]

    if (app_name === clover_name) {
      clover_path = clover
      break
    }
  }

  if (clover_path === '') {
    log.error(`${clover_name} not found`)
    return
  }

  clover_path = path.join(chieryDir, 'node_modules/', clover_path)
  return clover_path
}

export default getClover
