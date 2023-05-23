class VelocityFormula {
  static getVelocity(distance: number, time: number): number {
    return distance / time
  }

  static getDistance(velocity: number, time: number): number {
    return velocity * time
  }

  static getTime(distance: number, velocity: number): number {
    return distance / velocity
  }
}

class KineticEnergyFormula {
  static getEnergy(mass: number, velocity: number): number {
    return 0.5 * mass * Math.pow(velocity, 2)
  }

  static getMass(energy: number, velocity: number): number {
    return (2 * energy) / Math.pow(velocity, 2)
  }

  static getVelocity(energy: number, mass: number): number {
    return Math.sqrt((2 * energy) / mass)
  }
}

class FormulaFacade {
  getMovingObjectKineticEnergy(distance: number, time: number, mass: number): number {
    const velocity = VelocityFormula.getVelocity(distance, time)
    const energy = KineticEnergyFormula.getEnergy(mass, velocity)
    return energy
  }
}

class FacadeExample {
  formulary: FormulaFacade

  constructor() {
    this.formulary = new FormulaFacade()
    this.run()
  }

  run(): void {
    const mass = 10
    const time = 5
    const distance = 20

    const energy = this.formulary.getMovingObjectKineticEnergy(distance, time, mass)

    console.log(`Object has ${energy}J of Energy`)
  }
}

new FacadeExample()
