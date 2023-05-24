interface IProtoType {
  clone(mode: number): Document
}

class Document implements IProtoType {
  name: string
  array: [number[], number[]]

  constructor(name: string, array: [number[], number[]]) {
    this.name = name
    this.array = array
  }

  clone(mode: number = 1): Document {
    if (mode === 1) return new Document(this.name, Object.assign([], this.array))
    return new Document(this.name, JSON.parse(JSON.stringify(this.array)))
  }
}

class PrototypeExample {
  constructor() {
    this.run()
  }

  run() {
    const originalDocument = new Document('Original', [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ])
    console.log(originalDocument)
    console.log()

    const documentCopy1 = originalDocument.clone() // shallow copy
    documentCopy1.name = 'Copy 1'
    documentCopy1.array[1][2] = 200
    console.log(documentCopy1)
    console.log(originalDocument)
    console.log()

    const documentCopy2 = originalDocument.clone() // shallow copy
    documentCopy2.name = 'Copy 2'
    documentCopy2.array[1] = [9, 10, 11, 12]
    console.log(documentCopy2)
    console.log(originalDocument)
    console.log()

    const documentCopy3 = originalDocument.clone(2) // deep copy
    documentCopy3.name = 'Copy 3'
    documentCopy3.array[1][0] = 1234
    console.log(documentCopy3)
    console.log(originalDocument)
  }
}

new PrototypeExample()
