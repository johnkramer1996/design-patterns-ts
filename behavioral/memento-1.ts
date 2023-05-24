class Memento {
  constructor(
    public score: number,
    public inventory: Set<string>,
    public level: number,
    public location: { x: number; y: number; z: number },
  ) {}
}

class CareTaker {
  originator: GameCharacter
  mementos: Memento[]

  constructor(originator: GameCharacter) {
    this.originator = originator
    this.mementos = []
  }

  save(): void {
    console.log('CareTaker: Game Save')
    const memento = this.originator.memento
    this.mementos.push(memento)
  }

  restore(index: number): void {
    console.log('CareTaker: Restoring Characters attributes from Memento')
    const memento = this.mementos[index]
    this.originator.memento = memento
  }
}

class GameCharacter {
  _score: number
  inventory: Set<string>
  level: number
  location: { x: number; y: number; z: number }

  constructor() {
    this.score = 0
    this.inventory = new Set()
    this.level = 0
    this.location = { x: 0, y: 0, z: 0 }
  }

  get score(): number {
    return this._score
  }

  set score(value: number) {
    this._score = value
  }

  registerKill(): void {
    this.score += 100
  }

  addInventory(item: string): void {
    this.inventory.add(item)
  }

  progressToNextLevel(): void {
    this.level++
  }

  moveForward(amount: number): void {
    this.moveZ(amount)
  }

  moveBack(amount: number): void {
    this.moveZ(-amount)
  }

  private moveZ(amount: number): void {
    this.location.z += amount
  }

  status(): string {
    return (
      `Score: ${this.score}, ` +
      `Level: ${this.level}, ` +
      `Location: ${JSON.stringify(this.location)}\n` +
      `Inventory: ${JSON.stringify(Array.from(this.inventory))}`
    )
  }

  get memento(): Memento {
    console.log('get')
    return new Memento(
      this.score,
      new Set(this.inventory),
      this.level,
      Object.assign({}, this.location),
    )
  }

  set memento(value: Memento) {
    this.score = value.score
    this.inventory = value.inventory
    this.level = value.level
    this.location = value.location
  }
}

class MomentoExample {
  character = new GameCharacter()
  careTaker = new CareTaker(this.character)

  constructor() {
    this.run()
  }

  run(): void {
    const character = this.character
    const careTaker = this.careTaker
    character.registerKill()
    character.moveForward(1)
    character.addInventory('sword')
    character.registerKill()
    character.addInventory('rifle')
    character.moveForward(1)
    console.log(character.status())

    careTaker.save()

    character.registerKill()
    character.moveForward(1)
    character.progressToNextLevel()
    character.registerKill()
    character.addInventory('motorbike')
    character.moveForward(10)
    character.registerKill()
    console.log(character.status())

    careTaker.save()

    character.moveForward(1)
    character.progressToNextLevel()
    character.registerKill()
    character.moveBack(10)
    character.registerKill()
    console.log(character.status())

    careTaker.restore(0)
    console.log(character.status())
    careTaker.restore(1)
    console.log(character.status())
  }
}

new MomentoExample()
