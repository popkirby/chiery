import chalk from 'chalk'

export default {
  info(...args) {
    console.log(chalk.green('[info]'), ...args)
  },

  error(...args) {
    console.log(chalk.red('[error]'), ...args)
  }
}
