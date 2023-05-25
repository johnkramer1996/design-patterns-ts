interface Sedan {
  run(): string
}

interface Coupe {
  run(): string
}

interface CarsFactory {
  createSedan(): Sedan
  createCoupe(): Coupe
}

class ToyotaSedan implements Sedan {
  public run(): string {
    return 'ToyotaSedan'
  }
}

class FordSedan implements Sedan {
  public run(): string {
    return 'FordSedan'
  }
}

class ToyotaCoupe implements Coupe {
  public run(): string {
    return 'ToyotaCoupe'
  }
}

class FordCoupe implements Coupe {
  public run(): string {
    return 'FordCoupe'
  }
}

class FactoryAuto {
  static getFactory(bool: boolean): CarsFactory {
    return bool ? new ToyotaFactory() : new FordFactory()
  }
}

class ToyotaFactory implements CarsFactory {
  public createSedan(): Sedan {
    return new ToyotaSedan()
  }

  public createCoupe(): Coupe {
    return new ToyotaCoupe()
  }
}

class FordFactory implements CarsFactory {
  public createSedan(): Sedan {
    return new FordSedan()
  }

  public createCoupe(): Coupe {
    return new FordCoupe()
  }
}

const factory: CarsFactory = FactoryAuto.getFactory(true)

console.log(factory.createSedan().run())
console.log(factory.createCoupe().run())
