class Flyweight {
  code: number
  constructor(code: number) {
    this.code = code
  }
}

class FlyweightFactory {
  static flyweights: { [id: number]: Flyweight } = {}

  static getFlyweight(code: number): Flyweight {
    if (!(code in FlyweightFactory.flyweights)) {
      FlyweightFactory.flyweights[code] = new Flyweight(code)
    }
    return FlyweightFactory.flyweights[code]
  }

  static getCount(): number {
    return Object.keys(FlyweightFactory.flyweights).length
  }
}

class Table {
  rows: Row[] = []

  constructor(rowCount: number, columnCount: number) {
    for (let i = 0; i < rowCount; i++) {
      this.rows.push(new Row(columnCount))
    }
  }

  draw(): void {
    const rows = this.rows.map((row) => row.getData())
    const maxRowLength = Math.max(...this.rows.map((i) => i.getData().length)) + 1
    console.log('-'.repeat(maxRowLength))
    rows.forEach((row) => console.log('|' + row))
    console.log('-'.repeat(maxRowLength))
  }
}

class Row {
  columns: Column[]

  constructor(columnCount: number) {
    this.columns = []
    for (let i = 0; i < columnCount; i++) {
      this.columns.push(new Column())
    }
  }

  getData(): string {
    return this.columns.reduce((p, v) => {
      p += v.getData() + '|'
      return p
    }, '')
  }
}

class Column {
  codes: number[] = []
  width = 20
  justify = 0

  set data(str: string) {
    this.codes.length = 0
    this.codes = [...str].map((s) => s.charCodeAt(0))
  }

  getData(): string {
    let ret = this.codes.reduce((p, v) => {
      p += String.fromCharCode(FlyweightFactory.getFlyweight(v).code)
      return p
    }, '')

    switch (this.justify) {
      case 1:
        return this.leftAlign(this.width, ret, ' ')
      case 2:
        return this.rightAlign(this.width, ret, ' ')
      default:
        return this.center(this.width, ret, ' ')
    }
  }

  center(width: number, string: string, padding: string): string {
    return width <= string.length ? string : this.centerAlternate(width, padding + string, padding)
  }

  centerAlternate(width: number, string: string, padding: string): string {
    return width <= string.length ? string : this.center(width, string + padding, padding)
  }

  leftAlign(width: number, string: string, padding: string): string {
    return width <= string.length ? string : this.leftAlign(width, string + padding, padding)
  }

  rightAlign(width: number, string: string, padding: string): string {
    return width <= string.length ? string : this.rightAlign(width, padding + string, padding)
  }
}

class FlyweightExample {
  TABLE: Table

  constructor() {
    this.TABLE = new Table(3, 3)
    this.configure()
    this.run()
  }

  configure(): void {
    this.TABLE.rows[0].columns[0].data = 'Language'
    this.TABLE.rows[0].columns[1].data = 'javascripot'
    this.TABLE.rows[0].columns[2].data = 'typescript'
    this.TABLE.rows[1].columns[0].data = 'Filename extensions'
    this.TABLE.rows[1].columns[1].data = 'js'
    this.TABLE.rows[1].columns[2].data = 'ts'
    this.TABLE.rows[2].columns[0].data = 'First appeared'
    this.TABLE.rows[2].columns[1].data = 'December 4, 1995'
    this.TABLE.rows[2].columns[2].data = '1 October 2012'

    this.TABLE.rows[0].columns[0].justify = 1
    this.TABLE.rows[1].columns[0].justify = 1
    this.TABLE.rows[2].columns[0].justify = 1
    this.TABLE.rows[0].columns[2].justify = 2
    this.TABLE.rows[1].columns[2].justify = 2
    this.TABLE.rows[2].columns[2].justify = 2
    this.TABLE.rows[0].columns[0].width = 25
    this.TABLE.rows[1].columns[0].width = 25
    this.TABLE.rows[2].columns[0].width = 25
  }

  run(): void {
    this.TABLE.draw()

    console.log(`FlyweightFactory has ${FlyweightFactory.getCount()} flyweights`)
  }
}

new FlyweightExample()
