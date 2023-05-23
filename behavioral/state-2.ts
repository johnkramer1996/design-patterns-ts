abstract class CarState {
  protected car: Car

  constructor(_car: Car) {
    this.car = _car
  }

  abstract turnKeys(): void
  abstract toggleHandbrake(): void
  abstract accelerate(): void
  abstract brake(): void
}

class EngineOffState extends CarState {
  constructor(_car: Car) {
    super(_car)
    console.log('Engine is now turned off')
  }

  turnKeys(): void {
    console.log('Turning keys...')
    this.car.setState(new StoppedState(this.car))
  }

  toggleHandbrake(): void {
    this.car.handbrake = !this.car.handbrake
  }

  accelerate(): void {
    console.log('Engined is not started')
  }

  brake(): void {
    console.log('Engined is not started')
  }
}

class StoppedState extends CarState {
  constructor(_car: Car) {
    super(_car)
    console.log('Car is now stopped')
  }

  turnKeys(): void {
    console.log('Turning keys...')
    this.car.setState(new EngineOffState(this.car))
  }

  toggleHandbrake(): void {
    this.car.handbrake = !this.car.handbrake
    console.log(`Handbrake is ${this.car.handbrake ? 'on' : 'off'}`)
  }

  accelerate(): void {
    if (!this.car.handbrake) {
      console.log('Accelerating...')
      this.car.setState(new MovingState(this.car))
    } else console.log('Remove Handbrake first')
  }

  brake(): void {
    console.log('Car is stoppped')
  }
}

class MovingState extends CarState {
  constructor(_car: Car) {
    super(_car)
    console.log('Car is now moving')
  }

  turnKeys(): void {
    console.log('Car is moving, cannot turn keys')
  }

  toggleHandbrake(): void {
    console.log('Car is moving, cannot toggle handbrake')
  }

  accelerate(): void {
    console.log('Car keeps moving')
  }

  brake(): void {
    console.log('Braking...')
    this.car.setState(new StoppedState(this.car))
  }
}

class Car {
  private state: CarState = new EngineOffState(this)
  handbrake: boolean = true

  setState(_state: CarState): void {
    const currentState = this.state.constructor.name
    const nextState = _state.constructor.name
    console.log('change state ' + currentState + '->' + nextState)
    this.state = _state
  }

  turnKeys(): void {
    this.state.turnKeys()
  }

  toggleHandbrake(): void {
    this.state.toggleHandbrake()
  }

  accelerate(): void {
    this.state.accelerate()
  }

  brake(): void {
    this.state.brake()
  }
}

class StateExample {
  car: Car

  constructor() {
    this.car = new Car()
    this.run()
  }

  run(): void {
    // EngineOffState
    this.car.turnKeys()
    // StoppedState
    this.car.accelerate()
    this.car.toggleHandbrake()
    this.car.accelerate()
    // MovingState
    this.car.toggleHandbrake()
    this.car.turnKeys()
    this.car.brake()
    // StoppedState
    this.car.turnKeys()
    // EngineOffState
  }
}

new StateExample()
