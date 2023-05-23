interface ISubject {
  registerObserver(o: IObserver): void
  removeObserver(o: IObserver): void
  notifyObservers(): void
}

interface IObserver {
  update(temperature: number): void
}

class WeatherStation implements ISubject {
  private observers: IObserver[] = []
  private temperature: number

  registerObserver(o: IObserver) {
    this.observers.push(o)
  }

  removeObserver(o: IObserver) {
    const index = this.observers.indexOf(o)
    this.observers.splice(index, 1)
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this.temperature)
    }
  }

  setTemperature(temp: number) {
    console.log('WeatherStation: new temperature measurement: ' + temp)
    this.temperature = temp
    this.notifyObservers()
  }
}

class TemperatureDisplay implements IObserver {
  private subject: ISubject

  constructor(weatherStation: ISubject) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }

  update(temperature: number) {
    console.log('TemperatureDisplay: I need to update my display')
  }
}

class Fan implements IObserver {
  private subject: ISubject

  constructor(weatherStation: ISubject) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }

  update(temperature: number) {
    if (temperature > 25) {
      console.log('Fan: Its hot here, turning myself on...')
    } else {
      console.log('Fan: Its nice and cool, turning myself off...')
    }
  }
}

let weatherStation = new WeatherStation()

let tempDisplay = new TemperatureDisplay(weatherStation)
let fan = new Fan(weatherStation)

weatherStation.setTemperature(20)
weatherStation.setTemperature(30)
