interface ISubscriber {
  update(message: string): void
}

class RadioListener implements ISubscriber {
  update(message: string): void {
    console.log(`New Broadcast received: '${message}'`)
  }
}

class RadioStation {
  private listeners: ISubscriber[] = []

  subscribe(listener: ISubscriber): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: ISubscriber): void {
    this.listeners = this.listeners.filter((_listener) => listener !== _listener)
  }

  broadcast(message: string): void {
    this.listeners.forEach((listener: ISubscriber) => listener.update(message))
  }
}

class ObserverExample {
  station: RadioStation

  constructor() {
    this.station = new RadioStation()
    this.run()
  }

  run(): void {
    const radio1 = new RadioListener()
    const radio2 = new RadioListener()
    const radio3 = new RadioListener()
    const radio4 = new RadioListener()
    this.station.subscribe(radio1)
    this.station.subscribe(radio2)
    this.station.subscribe(radio3)

    this.station.broadcast('Music')

    this.station.unsubscribe(radio1)
    this.station.unsubscribe(radio4)
    this.station.subscribe(radio4)

    this.station.broadcast('News')
  }
}

new ObserverExample()
