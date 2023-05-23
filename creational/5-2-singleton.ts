class Singleton {
  private static instance: Singleton = new Singleton()

  private constructor() {}

  static getInstance(): Singleton {
    return this.instance
  }
}

console.log(Singleton.getInstance() === Singleton.getInstance())
