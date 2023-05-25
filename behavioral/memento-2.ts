interface Memento {
  originator: object

  restore(): void
}

class Snapshot implements Memento {
  originator: Editor
  private text: string

  constructor(_originator: Editor) {
    this.originator = _originator
    this.text = _originator.text
  }

  restore(): void {
    this.originator.text = this.text
  }
}

class History {
  private history: Memento[] = []

  add(state: Memento): void {
    console.log('Saving state')
    this.history.push(state)
  }

  undo(): void {
    if (this.history.length > 0) {
      console.log('Restoring previous state')
      let memento = this.history.pop()
      memento?.restore()
    } else console.log('Cannot undo')
  }
}

class Editor {
  text: string = ''
}

class MementoExample {
  editor: Editor
  history: History

  constructor() {
    this.editor = new Editor()
    this.history = new History()
    this.run()
  }

  run(): void {
    this.editor.text = 'Version 1.0'
    this.history.add(new Snapshot(this.editor))

    this.editor.text = 'Version 1.1'
    this.history.add(new Snapshot(this.editor))

    this.editor.text = 'Version 1.2'
    this.history.add(new Snapshot(this.editor))

    this.history.undo()
    console.log(this.editor.text)

    this.history.undo()
    console.log(this.editor.text)

    this.history.undo()
    console.log(this.editor.text)
  }
}

new MementoExample()
