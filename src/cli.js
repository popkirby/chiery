import Parser from './utils/parser'
import 'loud-rejection/register'
import requireDir from 'require-dir'

const commands = requireDir('./commands')

const subcommands = [
  ...Object.keys(commands)
]

const parser = new Parser(subcommands)

parser.on('command', (data) => {
  const subcommand = data[0]
  const args = data[1]
  commands[subcommand].handler(args)
})

parser.on('default', (data) => {
  console.log('help')
})

parser.parse(process.argv.slice(2))
