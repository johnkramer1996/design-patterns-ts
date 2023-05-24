interface IObservable {
  subscribe(observer: IObserver): void
  unsubscribe(observer: IObserver): void
  notify(...args: unknown[]): void
}

class Subject implements IObservable {
  private observers: Set<IObserver>
  private _state: string
  constructor() {
    this.observers = new Set()
  }

  subscribe(observer: IObserver) {
    console.log('subscribe->', observer)
    this.observers.add(observer)
  }

  unsubscribe(observer: IObserver) {
    console.log('unsubscribe->', observer)
    this.observers.delete(observer)
  }

  notify() {
    this.observers.forEach((observer) => {
      observer.notify(this.state)
    })
  }
  get state(): string {
    return this._state
  }

  set state(state: string) {
    this._state = state
  }
}

interface IObserver {
  notify(...args: unknown[]): void
}

class Observer implements IObserver {
  #id: number

  private static COUNTER = 0

  constructor(observable: IObservable) {
    this.#id = ++Observer.COUNTER
    observable.subscribe(this)
  }

  notify(message: string) {
    console.log(`Observer-${this.#id} received ${message}`)
  }
}

class ObserverExample {
  subject = new Subject()

  constructor() {
    const observer_1 = new Observer(this.subject)
    const observer_2 = new Observer(this.subject)
    this.subject.state = 'Message 1'
    this.run()

    this.subject.unsubscribe(observer_2)
    this.subject.state = 'Message 2'
    this.run()

    const observer_3 = new Observer(this.subject)
    this.subject.state = 'Message 3'
    this.run()
  }

  run(): void {
    this.subject.notify()
  }
}

new ObserverExample()
