import chieryDir from './chiery-dir'
import jsonfile from 'jsonfile'
import path from 'path'

function getClover(clover_name) {
  // TODO: DRY
  const cloversListPath = path.join(chieryDir, './clovers_list.json')
  const cloversList = jsonfile.readFileSync(cloversListPath)

  let cloverPath = ''
  for (const cp in cloversList) {
    if (cp.lastIndexOf(clover_name) >= 0) {
      cloverPath = cp
      break
    }
  }

  if (cloverPath === '') {
    return
  }

  return path.join(chieryDir, 'clovers', cloverPath)
}

export default getClover
