interface Command {
  execute(): any
  undo(): any
}

class Television {
  state: boolean = false

  on() {
    this.state = true
  }

  off() {
    this.state = false
  }
}
class TelevisionOnCommand implements Command {
  television: Television

  constructor(television: Television) {
    this.television = television
  }

  execute() {
    this.television.on()
  }

  undo() {
    this.television.off()
  }
}

class TelevisionOffCommand implements Command {
  television: Television

  constructor(television: Television) {
    this.television = television
  }

  execute() {
    this.television.off()
  }

  undo() {
    this.television.on()
  }
}

class Remote {
  onCommand!: Command
  offCommand!: Command

  setCommand(onCommand: Command, offCommand: Command) {
    this.onCommand = onCommand
    this.offCommand = offCommand
  }

  onButtonClick() {
    this.onCommand.execute()
  }

  offButtonClick() {
    this.offCommand.execute()
  }
}

class CommandExample {
  television = new Television()
  televisionOnCommand = new TelevisionOnCommand(this.television)
  televisionOffCommand = new TelevisionOffCommand(this.television)
  remote = new Remote()

  constructor() {
    this.run()
  }

  run(): void {
    this.remote.setCommand(this.televisionOnCommand, this.televisionOffCommand)

    console.log(this.television.state)
    this.remote.onButtonClick()
    console.log(this.television.state)
    this.remote.offButtonClick()
    console.log(this.television.state)
  }
}

new CommandExample()
