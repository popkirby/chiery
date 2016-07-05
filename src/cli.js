import yargs from 'yargs'
import requireDir from 'require-dir'

import 'loud-rejection/register'

const cli = yargs.usage('Usage: $0 <command> [args...]')
  .demand(1)
  .strict()

const commands = requireDir('./commands')

for (let name in commands) {
  cli.command(commands[name])
}

cli.help()

export default cli.argv
