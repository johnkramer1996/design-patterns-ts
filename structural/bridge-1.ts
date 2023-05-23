class Model {
  color: Color
  name: string

  constructor(color: Color, name: string) {
    this.color = color
    this.name = name
  }

  paint() {
    return `Auto: ${this.name}, Color: ${this.color.get()}`
  }
}

class Audi extends Model {
  constructor(color: Color) {
    super(color, 'Audi')
  }
}

class Bmw extends Model {
  constructor(color: Color) {
    super(color, 'Bmw')
  }
}

class Color {
  type: string

  constructor(type: string) {
    this.type = type
  }

  get() {
    return this.type
  }
}

class BlackColor extends Color {
  constructor() {
    super('dark-black')
  }
}

class SilbrigColor extends Color {
  constructor() {
    super('Silbermetallic')
  }
}

class BridgeExample {
  black: Color
  silbrig: Color
  constructor() {
    this.black = new BlackColor()
    this.silbrig = new SilbrigColor()
    this.run()
  }

  run() {
    const bmwBlack = new Bmw(this.black)
    const bmwSilbrig = new Bmw(this.silbrig)
    const audiBlack = new Audi(this.black)
    const audiSilbrig = new Audi(this.silbrig)

    console.log(bmwBlack.paint())
    console.log(bmwSilbrig.paint())
    console.log(audiBlack.paint())
    console.log(audiSilbrig.paint())
  }
}

new BridgeExample()
