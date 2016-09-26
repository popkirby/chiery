import chieryDir from '../utils/chiery-dir'
import log from '../utils/log'
import path from 'path'
import fs from '../utils/fs'

export const command = 'init [repo_url]'
export const desc = 'Initialize chiery'

export const handler = async (argv) => {
  log.chiery('start initialize')

  const force = argv.f || argv.force 

  // create $HOME/.chiery
  if (force) {
    log.info('overwrite .chiery')
    await fs.removeAsync(chieryDir)
  }

  await fs.copyAsync(
    path.join(__dirname, '../../templates/.chiery'),
    chieryDir,
    { clobber: force }
  )

  log.info('done.')
}
