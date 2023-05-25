interface Plane {
  name: string
  speed: number
  passengers: number

  signalTakeOff(): void
  signalLand(): void

  confirmTakeOff(): void
  confirmLand(): void
}

class Boeing737 implements Plane {
  name: string = 'Boeing 737'
  speed: number = 1012
  passengers: number = 215

  mediator: Mediator

  constructor(_mediator: Mediator) {
    this.mediator = _mediator
  }

  signalTakeOff(): void {
    this.mediator.notify(this, 'takeoff')
  }

  signalLand(): void {
    this.mediator.notify(this, 'land')
  }

  confirmTakeOff(): void {
    console.log(`${this.name} has taken off`)
  }

  confirmLand(): void {
    console.log(`${this.name} has landed`)
  }
}

class AirbusA300 implements Plane {
  name: string = 'Airbus A300'
  speed: number = 1012
  passengers: number = 250

  mediator: Mediator

  constructor(_mediator: Mediator) {
    this.mediator = _mediator
  }

  signalTakeOff(): void {
    this.mediator.notify(this, 'takeoff')
  }

  signalLand(): void {
    this.mediator.notify(this, 'land')
  }

  confirmTakeOff(): void {
    console.log(`${this.name} has taken off`)
  }

  confirmLand(): void {
    console.log(`${this.name} has landed`)
  }
}

class FokkerF100 implements Plane {
  name: string = 'Fokker F100'
  speed: number = 845
  passengers: number = 109

  mediator: Mediator

  constructor(_mediator: Mediator) {
    this.mediator = _mediator
  }

  signalTakeOff(): void {
    this.mediator.notify(this, 'takeoff')
  }

  signalLand(): void {
    this.mediator.notify(this, 'land')
  }

  confirmTakeOff(): void {
    console.log(`${this.name} has taken off`)
  }

  confirmLand(): void {
    console.log(`${this.name} has landed`)
  }
}

interface Mediator {
  notify(sender: object, event: string): void
}

class AirTrafficControlMediator implements Mediator {
  isRunwayFree: boolean = true

  notify(sender: Plane, event: string): void {
    switch (event) {
      case 'takeoff':
        if (this.isRunwayFree) {
          this.isRunwayFree = false
          sender.confirmTakeOff()
          this.isRunwayFree = true
        } else console.log(`${sender.name} could not take off, runway is occupied`)

        break

      case 'land':
        if (this.isRunwayFree) {
          this.isRunwayFree = false
          sender.confirmLand()
          this.isRunwayFree = true
        } else console.log(`${sender.name} could not land, runway is occupied`)

        break
    }
  }
}

class MediatorExample {
  atc: Mediator

  constructor() {
    this.atc = new AirTrafficControlMediator()
    this.run()
  }

  run(): void {
    let plane1 = new Boeing737(this.atc)
    let plane2 = new FokkerF100(this.atc)
    let plane3 = new AirbusA300(this.atc)

    plane1.signalTakeOff()
    plane2.signalLand()
    plane3.signalLand()
  }
}

new MediatorExample()
