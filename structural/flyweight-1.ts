class CloudFactory {
  private static cloudTypes: Map<string, CloudType> = new Map()

  static getCloudType(color: string): CloudType {
    let found = this.cloudTypes.get(color)

    if (!found) {
      found = new CloudType(color)
      this.cloudTypes.set(color, found)
    }

    return found
  }

  static getInstancesSize(): number {
    return this.cloudTypes.size
  }
}

class CloudType {
  color: string

  constructor(_color: string) {
    this.color = _color
  }
}

class Cloud {
  x: number
  y: number
  type: CloudType

  constructor(_x: number, _y: number, _type: CloudType) {
    this.x = _x
    this.y = _y
    this.type = _type
  }

  rain(): void {
    console.log(`Rain falls from ${this.type.color} cloud`)
  }
}

class Sky {
  clouds: Cloud[] = []

  addCloud(x: number, y: number, color: string): void {
    let type = CloudFactory.getCloudType(color)
    let cloud = new Cloud(x, y, type)

    this.clouds.push(cloud)
  }

  rain(): void {
    this.clouds.forEach((cloud: Cloud) => cloud.rain())
  }
}

class FlyweightExample {
  sky: Sky

  constructor() {
    this.sky = new Sky()
    this.configure()
    this.run()
  }

  configure(): void {
    this.sky.addCloud(0, 0, 'white')
    this.sky.addCloud(1, 1, 'white')
    this.sky.addCloud(1, 0, 'grey')
    this.sky.addCloud(0, 1, 'grey')
  }

  run(): void {
    this.sky.rain()

    console.log(`Cloud type instances: ${CloudFactory.getInstancesSize()}`)
  }
}

new FlyweightExample()
