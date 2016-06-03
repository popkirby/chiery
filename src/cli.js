import yargs from 'yargs'
import path from 'path'

const argv = yargs.usage('$0 command')
  .commandDir(path.join(__dirname, 'commands'))
  .demand(1)
  .strict()
  .help()
  .argv

export default argv
