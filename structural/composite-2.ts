class Equipment {
  price: number
  name: string

  getPrice() {
    return this.price || 0
  }
}

class Composite extends Equipment {
  equipments: Equipment[] = []
  constructor() {
    super()
  }

  add(equipment: Equipment) {
    this.equipments.push(equipment)
  }

  getPrice() {
    return this.equipments.map((equipment) => equipment.getPrice()).reduce((a, b) => a + b, 0)
  }
}

class Office extends Composite {
  constructor() {
    super()
    this.name = 'Office'
  }
}

class Cabinet extends Composite {
  constructor() {
    super()
    this.name = 'Cabinet'
  }
}

class Monitor extends Equipment {
  constructor() {
    super()
    this.name = 'Monitor'
    this.price = 300
  }
}

class Computer extends Composite {
  constructor() {
    super()
    this.name = 'Computer'
  }
}

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

class Mouse extends Equipment {
  constructor() {
    super()
    this.name = 'Memory'
    this.price = 120
  }
}

class Keyboard extends Equipment {
  constructor() {
    super()
    this.name = 'Keyboard'
    this.price = 150
  }
}

const office = new Office()
const cabinet = new Cabinet()
const computer = new Computer()
const monitor = new Monitor()

computer.add(new HardDrive())
computer.add(new Memory())
computer.add(new FloppyDisk())
computer.add(new Mouse())
computer.add(new Keyboard())

cabinet.add(computer)
cabinet.add(monitor)

office.add(cabinet)
office.add(cabinet)
office.add(computer)

console.log(computer.getPrice())
console.log(cabinet.getPrice())
console.log(office.getPrice())
