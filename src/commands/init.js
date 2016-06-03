import chalk from 'chalk'
import fs from 'fs'
import log from '../utils/log'
import mkdirp from 'mkdirp'
import path from 'path'
import replaceEnv from '../utils/replace-env'

export const command = 'init <scope_name>'
export const desc = 'Initialize chiery with npm scope name'
export const builder = {
}

export const handler = (argv) => {
  console.log('🍀 ', chalk.green('chiery: start initialize'))

  const chieryDir = replaceEnv('$HOME/.chiery')

  try {
    mkdirp.sync(chieryDir)
  } catch(e) {
    log.error('an error occured while creating directory', e)
    return
  }

  log.info('chiery directory created at', chieryDir)
  log.info('you may want to set $CHIERYDIR to', chieryDir)

  log.info('generating package.json...')

  const scope = argv.scope_name.replace('@', '')

  const packageJson = {
    'name': `@${scope}/chiery_core`,
    'version': '0.0.0',
    'chiery': {
    }
  }

  fs.writeFileSync(path.join(chieryDir, 'package.json'), JSON.stringify(packageJson))

}
