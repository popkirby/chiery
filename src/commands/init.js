import chalk from 'chalk'
import chieryDir from '../utils/chiery-dir'
import log from '../utils/log'
import path from 'path'
import replaceEnv from '../utils/replace-env'
import fs from '../utils/fs'

export const command = 'init [repo_url]'
export const desc = 'Initialize chiery'
export const builder = (yargs) => {
  return yargs.usage('$0 init [options] [repo_url]')
    .option('force', {
      alias: 'f',
      desc: 'Overwrite $HOME/.chiery',
      type: 'boolean'
    })
    .help()
}

export const handler = async (argv) => {
  log.chiery('start initialize')

  // create $HOME/.chiery
  if (argv.force) {
    log.info('overwrite .chiery')
    await fs.removeAsync(chieryDir)
  }

  await fs.copyAsync(
    path.join(__dirname, '../../templates/.chiery'),
    chieryDir,
    { clobber: argv.force }
  )

  log.info('done.')
}
