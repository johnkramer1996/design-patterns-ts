const Singleton = (() => {
  let instance: Singleton | null = null

  class Singleton {
    constructor() {
      if (instance) return instance
      instance = this
    }
  }

  return Singleton
})()

console.log(new Singleton() === new Singleton())
