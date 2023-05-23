interface Person {
  getClothingInfo(): void
}

class BasicPerson implements Person {
  getClothingInfo() {
    console.log("I'm wearing basic clothes")
  }
}

abstract class BaseDecorator implements Person {
  protected person: Person

  constructor(_person: Person) {
    this.person = _person
  }

  getClothingInfo(): void {
    this.person.getClothingInfo()
  }
}

class JacketDecorator extends BaseDecorator {
  constructor(_person: Person) {
    super(_person)
  }

  getClothingInfo(): void {
    super.getClothingInfo()
    console.log('and a jacket')
  }
}

class UmbrellaDecorator extends BaseDecorator {
  constructor(_person: Person) {
    super(_person)
    this.openUmbrella()
  }

  getClothingInfo(): void {
    super.getClothingInfo()
    console.log("i'm also carrying an umbrella")
  }

  openUmbrella(): void {
    console.log('Opened umbrella')
  }
}

class DecoratorExample {
  person: Person

  constructor() {
    Array(4)
      .fill(0)
      .forEach((_, el: number) => {
        const cold = el & 1
        const raining = (el >> 1) & 1
        this.person = this.configure(!!cold, !!raining)
        this.run()
      })
  }

  configure(cold: boolean, raining: boolean): Person {
    let person = new BasicPerson()

    if (cold) person = new JacketDecorator(person)
    if (raining) person = new UmbrellaDecorator(person)

    return person
  }

  run(): void {
    this.person.getClothingInfo()
    console.log('---')
  }
}

new DecoratorExample()
