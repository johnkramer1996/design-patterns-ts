// https://www.tutorialspoint.com/design_pattern/proxy_pattern.htm - создание обьекта при вывове метода
interface Image {
  display(): void
}

class RealImage implements Image {
  private fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
    this.loadFromDisk(fileName)
  }

  public display(): void {
    console.log('Displaying ' + this.fileName)
  }

  private loadFromDisk(fileName: string): void {
    console.log('Loading ' + fileName)
  }
}

class ProxyLazyImage implements Image {
  private realImage: RealImage
  private fileName: string

  constructor(fileName: string) {
    this.fileName = fileName
  }

  public display(): void {
    if (!this.realImage) this.realImage = new RealImage(this.fileName)
    this.realImage.display()
  }
}

class ProxyExample {
  constructor() {
    this.run()
  }

  run(): void {
    const image: Image = new ProxyLazyImage('test_10mb.jpg')
    image.display()
    image.display()
  }
}

new ProxyExample()
