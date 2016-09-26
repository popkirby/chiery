import minimist from 'minimist'
import EventEmitter from 'events'


export default class Parser extends EventEmitter {
  constructor(subcommands) {
    super()

    this.subcommands = subcommands
  }

  parse(argv) {
    const subcommand = argv[0]

    if (this.subcommands.includes(subcommand)) {
      this.emit('command', [subcommand, minimist(argv.slice(1))])
    } else {
      this.emit('default', [minimist(argv)])
    }
  }
}
