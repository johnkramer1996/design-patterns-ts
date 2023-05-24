interface IState {
  turn: string
  brightness: string
}

class Receiver {
  state: IState = { turn: 'off', brightness: '80' }
  constructor() {}
}

class Invoker {
  private commands: Command[] = []
  private current = -1

  executeCommand(command: Command) {
    if (this.commands.length - 1 > this.current) {
      const next = this.current + 1
      this.commands.splice(next, this.commands.length - next)
    }
    this.commands.push(command)
    command.execute()
    this.current = this.commands.length - 1
  }

  undo() {
    if (this.current < 0) return
    this.commands[this.current--].undo()
  }

  redo() {
    if (!(this.current < this.commands.length - 1)) return
    this.commands[++this.current].execute()
  }
}

abstract class Command {
  private receiver: Receiver
  private value: string
  private previousValue: string = ''
  protected propertyName: string

  constructor(receiver: Receiver, value: string) {
    this.receiver = receiver
    this.value = value
  }

  execute() {
    this.previousValue = this.receiver.state[this.propertyName as keyof IState]
    this.receiver.state[this.propertyName as keyof IState] = this.value
  }

  undo() {
    this.receiver.state[this.propertyName as keyof IState] = this.previousValue
  }
}

class TurnCommand extends Command {
  propertyName = 'turn'
}

class BrightnessCommand extends Command {
  propertyName = 'brightness'
}

const receiver = new Receiver()
const invoker = new Invoker()

console.log(receiver)
invoker.executeCommand(new TurnCommand(receiver, 'on'))
invoker.executeCommand(new TurnCommand(receiver, 'off'))
invoker.executeCommand(new BrightnessCommand(receiver, '60'))
invoker.undo()
invoker.undo()
invoker.executeCommand(new BrightnessCommand(receiver, '40'))
console.log(receiver)
