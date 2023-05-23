interface Case {
  width: number
  length: number
  height: number

  volume(): number
  info(): void
}

interface Monitor {
  resolution: number
  size: number

  info(): void
}

class StandardCase implements Case {
  width: number = 20
  height: number = 60
  length: number = 40

  volume(): number {
    return this.width * this.length * this.height
  }

  info(): void {
    console.log('Standard Case')
  }
}

class SmallCase implements Case {
  width: number = 15
  height: number = 40
  length: number = 20

  volume(): number {
    return this.width * this.length * this.height
  }

  info(): void {
    console.log('Small Case')
  }
}

class StandardMonitor implements Monitor {
  resolution: number = 1440
  size: number = 27

  info(): void {
    console.log('Standard Monitor')
  }
}

class SmallMonitor implements Monitor {
  resolution: number = 1080
  size: number = 22

  info(): void {
    console.log('Small Monitor')
  }
}

abstract class RigFactory {
  abstract createMonitor(): Monitor
  abstract createCase(): Case
}

class StandardRigFactory extends RigFactory {
  createMonitor(): Monitor {
    return new StandardMonitor()
  }

  createCase(): Case {
    return new StandardCase()
  }
}

class SmallRigFactory extends RigFactory {
  createMonitor(): Monitor {
    return new SmallMonitor()
  }

  createCase(): Case {
    return new SmallCase()
  }
}

class AbstractFactoryExample {
  factory: RigFactory
  case: Case
  monitor: Monitor

  constructor() {
    this.factory = this.configure('small')
    this.run()
    this.factory = this.configure('standard')
    this.run()
  }

  private configure(size: string): RigFactory {
    switch (size) {
      case 'small':
        return new SmallRigFactory()

      case 'standard':
      default:
        return new StandardRigFactory()
    }
  }

  private run() {
    this.case = this.factory.createCase()
    this.monitor = this.factory.createMonitor()
    this.case.info()
    this.monitor.info()
  }
}

new AbstractFactoryExample()
