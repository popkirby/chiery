import chalk from 'chalk'
import chieryDir from '../utils/chieryDir'
import childProcess from 'child_process'
import log from '../utils/log'
import replaceEnv from '../utils/replace-env'

export const command = 'install [repo_url]'
export const desc = 'Install clovers'
export const builder = {
}

export const handler = (argv) => {
  console.log('🍀 ', chalk.green('chiery: start install'))
  let command = ''

  if (typeof argv.repo_url === 'undefined') {
    command = 'npm install'
  } else  {
    command = `npm install ${argv.repo_url} --save`
  }

  childProcess.exec(command,
    {cwd: chieryDir},
    (err, stdout, stderr) => {
      if (err) {
        log.error('an error occured while install', err)
        log.error('stderr:', stderr)
        return
      }

      if (typeof argv.repo_url === 'undefined') {
        log.info('successfully updated')
        log.info('stdout:', stdout)
      } else {
        log.info('successfully installed', argv.repo_url)
      }
    }
  )
}

