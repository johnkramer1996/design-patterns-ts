class Commander {
  executeObject: Executive

  constructor(executeObject: Executive) {
    this.executeObject = executeObject
  }

  order(): void {
    this.executeObject.operate()
  }
}

class AirForceCommander extends Commander {
  order(): void {
    console.log('Air Force commander make order')
    super.order()
  }
}

class SpecialForceCommander extends Commander {
  order(): void {
    console.log('Special Force commander make order')
    super.order()
  }
}

interface Executive {
  operate(): void
}

class Pilot implements Executive {
  operate(): void {
    console.log('Fly')
  }
}

class Soldier implements Executive {
  operate(): void {
    console.log('Shoot')
  }
}

const pilot = new Pilot()
const soldier = new Soldier()
const commanderA = new AirForceCommander(pilot)
const commanderB = new SpecialForceCommander(soldier)
const commanderC = new AirForceCommander(soldier)
const commanderD = new SpecialForceCommander(pilot)

commanderA.order()
commanderB.order()
commanderC.order()
commanderD.order()
