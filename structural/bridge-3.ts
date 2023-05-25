interface IPrinter {
  print(): void
}

abstract class Printer implements IPrinter {
  constructor(protected ink: IInk) {}

  abstract print(): void
}

class EpsonPrinter extends Printer {
  print() {
    return 'Printer: Epson, Ink: ' + this.ink.get()
  }
}

class HPprinter extends Printer {
  print() {
    return 'Printer: HP, Ink: ' + this.ink.get()
  }
}

interface IInk {
  get(): string
}

class Ink implements IInk {
  constructor(private type: string) {}

  get() {
    return this.type
  }
}

class AcrylicInk extends Ink {
  constructor() {
    super('acrylic-based')
  }
}

class AlcoholInk extends Ink {
  constructor() {
    super('alcohol-based')
  }
}

const acrylicInk = new AcrylicInk()
const lcoholInk = new AlcoholInk()

const epsonPrinter = new EpsonPrinter(acrylicInk)
const hpPrinter = new HPprinter(lcoholInk)

console.log(epsonPrinter.print())
console.log(hpPrinter.print())
