import chieryDir from '../utils/chiery-dir'
import child_process from 'child_process'
import fs from '../utils/fs'
import jsonfile from 'jsonfile'
import log from '../utils/log'
import path from 'path'
import postInstall from '../utils/postinstall'
import Promise from 'bluebird'
import url from 'url'

export const command = 'install [clover_url]'
export const desc = 'Install clovers'
export const builder = {
}

export const handler = async (argv) => {
  if (typeof argv._[0] === 'undefined') {
    log.chiery('install all clovers')
    installAllClovers()
  } else {
    // install / update one clover 
    // clone the clover into $CHIERYDIR/clovers
    installClover(argv._[0])
  }
}

async function installAllClovers() {
  // get infomation of clovers
  const cloversListPath = path.join(chieryDir, './clovers_list.json')
  const cloversList = jsonfile.readFileSync(cloversListPath)
  const cloversPromises = []

  for (let cloverKey in cloversList) {
    cloversPromises.push(installClover(cloversList[cloverKey].url))
  }

  await Promise.all(cloversPromises)
}


async function installClover(clover) {
  // github url -> path
  log.chiery(`install ${clover}`)
  const cloverUrl = url.parse(clover)
  let cloverKey = `${cloverUrl.host}${cloverUrl.path}`

  if (cloverUrl.host === null) {
    cloverKey = `github.com/${cloverUrl.path}`
    clover = 'https://' + cloverKey
  } else if (cloverUrl.host !== 'github.com') {
    log.error('chiery can only install from github')
    return
  }

  const installPath = path.join(chieryDir, 'clovers', cloverKey)

  try {
    fs.accessSync(installPath)
    log.info(`${installPath} exists; update`)
    child_process.spawnSync('git', ['pull'], {cwd: installPath})
    return
  } catch (e) { /* do nothing */ }

  // clone specified clover from github
  try {
    log.info('cloning clover...')
    // await Git.Clone(clover, installPath)
    child_process.spawnSync('git', ['clone', clover, installPath])
  } catch (e) {
    log.error(`couldn't clone ${clover}; skipping`)
    return
  }

  // execute postinstall hook
  await postInstall(installPath)

  // save to clovers_list
  const cloversListPath = path.join(chieryDir, './clovers_list.json')
  const cloversList = jsonfile.readFileSync(cloversListPath)

  cloversList[cloverKey] = {
    url: clover
  }

  jsonfile.writeFileSync(cloversListPath, cloversList)

  log.info(`successfully installed ${clover}.`)

}

