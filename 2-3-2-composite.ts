//Equipment
class Equipment {
  price: number
  name: string

  getPrice() {
    return this.price || 0
  }

  getName() {
    return this.name
  }
}

// --- composite ---
class Composite extends Equipment {
  equipments: Equipment[] = []
  constructor() {
    super()
  }

  add(equipment: Equipment) {
    this.equipments.push(equipment)
  }

  getPrice() {
    return this.equipments.map((equipment) => equipment.getPrice()).reduce((a, b) => a + b)
  }
}

class Cabinet extends Composite {
  constructor() {
    super()
    this.name = 'cabinet'
  }
}

// --- leafs ---
class FloppyDisk extends Equipment {
  constructor() {
    super()
    this.name = 'Floppy Disk'
    this.price = 70
  }
}

class HardDrive extends Equipment {
  constructor() {
    super()
    this.name = 'Hard Drive'
    this.price = 250
  }
}

class Memory extends Equipment {
  constructor() {
    super()
    this.name = 'Memory'
    this.price = 280
  }
}

const cabinet = new Cabinet()

cabinet.getPrice()
