type dimension = {
  height: number
  width: number
  depth: number
}

interface IChair {
  height: number
  width: number
  depth: number
  getDimensions(): dimension
}

enum TypeChar {
  SMALL,
  MEDIUM,
  BIG,
}

class Chair implements IChair {
  height = 0
  width = 0
  depth = 0

  getDimensions(): dimension {
    return {
      width: this.width,
      depth: this.depth,
      height: this.height,
    }
  }
}

class ChairFactory {
  static getChair(chair: TypeChar): IChair {
    return new ([SmallChair, MediumChair, BigChair][chair] || BigChair)()
  }
}

class SmallChair extends Chair {
  constructor() {
    super()
    this.height = 40
    this.width = 40
    this.depth = 40
  }
}

class MediumChair extends Chair {
  constructor() {
    super()
    this.height = 60
    this.width = 60
    this.depth = 60
  }
}

class BigChair extends Chair {
  constructor() {
    super()
    this.height = 80
    this.width = 80
    this.depth = 80
  }
}

const chair = ChairFactory.getChair(TypeChar.BIG)
console.log(chair.getDimensions())
