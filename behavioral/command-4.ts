class Television {
  private volume: number = 20
  private channel: number = 1

  operation(opcode: string): void {
    switch (opcode) {
      case 'volup':
        if (this.volume < 100) this.volume += 10
        break

      case 'voldown':
        if (this.volume > 0) this.volume -= 10
        break

      case 'chup':
        if (this.channel < 999) this.channel++
        break

      case 'chdown':
        if (this.channel > 1) this.channel--
        break
    }
  }

  getVolume(): number {
    return this.volume
  }

  getChannel(): number {
    return this.channel
  }
}

class Remote {
  commands: Command[] = []

  add(command: Command): void {
    this.commands.push(command)
  }

  pushButtons(): void {
    this.commands.forEach((command: Command) => command.execute())
    this.commands = []
  }
}

interface Command {
  execute(): void
}

class VolumeUpCommand implements Command {
  tv: Television

  constructor(_tv: Television) {
    this.tv = _tv
  }

  execute(): void {
    console.log('Turning volume up')
    this.tv.operation('volup')
    console.log(`Volume is now ${this.tv.getVolume()}`)
  }
}

class VolumeDownCommand implements Command {
  tv: Television

  constructor(_tv: Television) {
    this.tv = _tv
  }

  execute(): void {
    console.log('Turning volume down')
    this.tv.operation('voldown')
    console.log(`Volume is now ${this.tv.getVolume()}`)
  }
}

class ChannelUpCommand implements Command {
  tv: Television

  constructor(_tv: Television) {
    this.tv = _tv
  }

  execute(): void {
    console.log('Turning channel up')
    this.tv.operation('chup')
    console.log(`Channel is now ${this.tv.getChannel()}`)
  }
}

class ChannelDownCommand implements Command {
  tv: Television

  constructor(_tv: Television) {
    this.tv = _tv
  }

  execute(): void {
    console.log('Turning channel down')
    this.tv.operation('chdown')
    console.log(`Channel is now ${this.tv.getChannel()}`)
  }
}

class CommandExample {
  tv: Television
  remote: Remote

  constructor() {
    this.tv = new Television()
    this.remote = this.configure()
    this.run()
  }

  configure(): Remote {
    let command1 = new VolumeUpCommand(this.tv)
    let command2 = new VolumeDownCommand(this.tv)
    let command3 = new ChannelUpCommand(this.tv)
    let command4 = new ChannelDownCommand(this.tv)

    let remote = new Remote()

    remote.add(command1)
    remote.add(command2)
    remote.add(command3)
    remote.add(command4)

    return remote
  }

  run(): void {
    this.remote.pushButtons()
  }
}

new CommandExample()
