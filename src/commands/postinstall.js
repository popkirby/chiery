import chalk from 'chalk'
import fs from 'fs'
import log from '../utils/log'
import path from 'path'
import replaceEnv from '../utils/replace-env'

export const command = 'postinstall'
export const desc = 'called from npm postinstall'
export const builder = {}
export const handler = () => {
  console.log('🍀 ', chalk.green('chiery: start postinstall hook'))
  const packageJson = JSON.parse(fs.readFileSync(getDotFilePath('package.json')))
  const config = packageJson.chiery

  if (typeof config === 'undefined') {
    log.error('"chiery" field does not exist in package.json')
    return
  } else if (typeof config.link === 'undefined') {
    log.error('"chiery.link" field does not exist in package.json')
    return
  }

  // create symlinks
  for (const src in config.link) {
    const dest = replaceEnv(config.link[src])
    createSymlink(src, dest)
  }
}

function createSymlink(src, dest) {
  let isExist = true
  try {
    fs.accessSync(dest, fs.W_OK)
  } catch(e) {
    isExist = false
  }

  if (isExist) {
    log.info(dest, 'exists; overwriting')
    fs.unlinkSync(dest)
  }

  const stat = fs.statSync(src)
  const absSrc = path.resolve(src)

  fs.symlink(absSrc, dest, stat.isDirectory() ? 'directory' : 'file', function(err) {
    if (err) {
      console.log(chalk.red('[error]'), 'cannot create symlink', src, '->', dest)
      return
    }

    log.info('created symlink', src, '->', dest)
  })
}

function getDotFilePath(filename) {
  return path.join(process.cwd(), filename)
}

