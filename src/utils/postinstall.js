import fs from './fs'
import jsonfile from 'jsonfile'
import log from './log'
import path from 'path'
import replaceEnv from './replace-env'

async function postInstall(cloverPath) {
  process.chdir(cloverPath)

  const cloverfile = jsonfile.readFileSync(path.join(cloverPath, './clover.json'))

  // create symlink
  if ('link' in cloverfile) {
    for (const src in cloverfile.link) {
      const dest = replaceEnv(cloverfile.link[src])
      log.chiery('create symlink:', src, '->', dest)
      createSymlink(src, dest)
    }
  }

  // exec postinstall hook
  if ('postinstall' in cloverfile) {
    for (const script of cloverfile.postinstall) {
      // TODO: execute postinstall script
    }
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
      log.error('cannot create symlink', src, '->', dest)
      return
    }

  })
}

export default postInstall
