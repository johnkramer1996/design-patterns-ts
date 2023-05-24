class GameCharacter {
  #position: [number, number] = [0, 0]

  constructor(private _movementStyle: IMove) {}

  move() {
    this.movementStyle.move(this.#position)
  }

  set movementStyle(movementStyle: IMove) {
    this._movementStyle = movementStyle
  }

  get movementStyle() {
    return this._movementStyle
  }
}

interface IMove {
  move(position: [number, number]): void
}

class Walking implements IMove {
  move(position: [number, number]) {
    position[0] += 1
    console.log(`I am Walking. New position = ${position}`)
  }
}

class Sprinting implements IMove {
  move(position: [number, number]) {
    position[0] += 2
    console.log(`I am Running. New position = ${position}`)
  }
}

class Crawling implements IMove {
  move(position: [number, number]) {
    position[0] += 0.5
    console.log(`I am Crawling. New position = ${position} `)
  }
}

class StrategyExample {
  walking = new Walking()
  sprinting = new Sprinting()
  crawling = new Crawling()
  gameCharacter = new GameCharacter(this.walking)

  constructor() {
    this.run()

    this.gameCharacter.movementStyle = this.sprinting
    this.run()

    this.gameCharacter.movementStyle = this.crawling
    this.run()

    this.gameCharacter.movementStyle = this.walking
    this.run()
  }

  run() {
    this.gameCharacter.move()
    this.gameCharacter.move()
    this.gameCharacter.move()
  }
}

new StrategyExample()
