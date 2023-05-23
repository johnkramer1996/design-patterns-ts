interface Vehicle {
  wheels: number
  horsepower: number
  speed: number

  start(): void
}

class Car implements Vehicle {
  wheels: number
  horsepower: number
  speed: number

  constructor(_horsepower: number, _speed: number) {
    this.wheels = 4
    this.horsepower = _horsepower
    this.speed = _speed
  }

  start(): void {
    console.log('Car started')
  }
}

class Motorcycle implements Vehicle {
  wheels: number
  horsepower: number
  speed: number

  constructor(_horsepower: number, _speed: number) {
    this.wheels = 2
    this.horsepower = _horsepower
    this.speed = _speed
  }

  start(): void {
    console.log('Motorcycle started')
  }
}

abstract class VehicleFactory {
  abstract createVehicle(): Vehicle

  start(): void {
    let v = this.createVehicle()
    v.start()
  }
}

class CarFactory extends VehicleFactory {
  createVehicle(): Vehicle {
    let horsepower = 100
    let speed = 150

    return new Car(horsepower, speed)
  }
}

class MotorcycleFactory extends VehicleFactory {
  createVehicle(): Vehicle {
    let horsepower = 25
    let speed = 100

    return new Motorcycle(horsepower, speed)
  }
}

class FactoryMethodExample {
  vehicle1: VehicleFactory
  vehicle2: VehicleFactory

  constructor() {
    this.vehicle1 = new CarFactory()
    this.vehicle2 = new MotorcycleFactory()

    this.run()
  }

  private run(): void {
    this.vehicle1.start()
    this.vehicle2.start()
  }
}

new FactoryMethodExample()
