/////////https://www.sourcecodeexamples.net/2020/08/typescript-iterator-pattern-example.html

interface IIterator {
  next(): any
  hasNext(): boolean
}

interface IAggregator {
  createIterator(): IIterator
}

class Iterator implements IIterator {
  private collection: any[] = []
  private position: number = 0

  constructor(collection: any[]) {
    this.collection = collection
  }

  public next(): any {
    const result = this.collection[this.position]
    return this.position++, result
  }

  public hasNext(): boolean {
    return this.position < this.collection.length
  }
}

class Numbers implements IAggregator {
  private collection: number[] = []

  constructor(collection: number[]) {
    this.collection = collection
  }

  public createIterator(): IIterator {
    return new Iterator(this.collection)
  }

  [Symbol.iterator]() {
    return {
      current: 0,
      collection: this.collection,
      next() {
        return {
          value: this.collection[this.current++],
          done: this.current > this.collection.length,
        }
      },
    }
  }
}

const numbers: Numbers = new Numbers([1, 7, 21, 657, 3, 2, 765, 13, 65])
console.log('iterator')
const it = numbers.createIterator()
while (it.hasNext()) console.log(it.next())
console.log('native iterator')
console.log(...numbers)
