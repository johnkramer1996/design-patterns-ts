interface IPhone {
  useLightning(): void
}

interface Android {
  useMicroUSB(): void
}

class iPhone14 implements IPhone {
  useLightning() {
    console.log('Using lightning port..')
  }
}

class GalaxyS23 implements Android {
  useMicroUSB() {
    console.log('Using micro USB...')
  }
}

class LightningToMicroUSBAdapter implements Android {
  device: IPhone

  constructor(android: IPhone) {
    this.device = android
  }

  useMicroUSB() {
    this.device.useLightning()
  }
}

class MicroUSBToLightningAdapter implements IPhone {
  device: Android

  constructor(android: Android) {
    this.device = android
  }

  useLightning() {
    this.device.useMicroUSB()
  }
}

const galaxy = new GalaxyS23()
const chargeGalaxyAdaptor = new MicroUSBToLightningAdapter(galaxy)
galaxy.useMicroUSB()
chargeGalaxyAdaptor.useLightning()

const iphone = new iPhone14()
const chargeIPhoneAdaptor = new LightningToMicroUSBAdapter(iphone)
iphone.useLightning()
chargeIPhoneAdaptor.useMicroUSB()
