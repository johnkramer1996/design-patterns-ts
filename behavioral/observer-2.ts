export interface Subscriber {
  update(message: string): void
}

export class RadioListener implements Subscriber {
  update(message: string): void {
    console.log(`New Broadcast received: '${message}'`)
  }
}

export class RadioStation {
  private listeners: Subscriber[] = []

  subscribe(listener: Subscriber): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: Subscriber): void {
    this.listeners = this.listeners.filter((_listener) => listener === _listener)
  }

  broadcast(message: string): void {
    this.listeners.forEach((listener: Subscriber) => listener.update(message))
  }
}

class ObserverExample {
  station: RadioStation

  constructor() {
    this.station = new RadioStation()
    this.run()
  }

  run(): void {
    this.station.subscribe(new RadioListener())
    this.station.subscribe(new RadioListener())
    this.station.subscribe(new RadioListener())

    this.station.broadcast('Music')

    this.station.subscribe(new RadioListener())

    this.station.broadcast('News')
  }
}

new ObserverExample()
