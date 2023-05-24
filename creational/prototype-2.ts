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
  originalDocument = new Document('Original', [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ])

  constructor() {
    console.log(this.originalDocument)

    const documentCopy1 = this.originalDocument.clone() // shallow copy
    documentCopy1.name = 'Copy 1'
    documentCopy1.array[1][2] = 200
    this.run(documentCopy1)

    const documentCopy2 = this.originalDocument.clone() // shallow copy
    documentCopy2.name = 'Copy 2'
    documentCopy2.array[1] = [9, 10, 11, 12]
    this.run(documentCopy2)

    const documentCopy3 = this.originalDocument.clone(2) // deep copy
    documentCopy3.name = 'Copy 3'
    documentCopy3.array[1][0] = 1234
    this.run(documentCopy3)
  }

  run(copy: Document) {
    console.log(copy)
    console.log(this.originalDocument)
  }
}

new PrototypeExample()
