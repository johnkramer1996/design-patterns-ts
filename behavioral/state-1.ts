class Order {
  public cancelledOrderState: State
  public paymentPendingState: State
  public orderShipedState: State
  public orderBeingPrepared: State

  public currentState!: State

  constructor() {
    this.cancelledOrderState = new CancelledOrderState(this)
    this.paymentPendingState = new PaymentPendingState(this)
    this.orderShipedState = new OrderShippedState(this)
    this.orderBeingPrepared = new OrderBeingPrepared(this)

    this.setState(this.paymentPendingState)
  }

  public setState(state: State) {
    this.currentState = state
  }

  public getCurrentState(): State {
    return this.currentState
  }
}

abstract class State {
  order: Order

  abstract cancelOrder(): void
  abstract verifyPayment(): void
  abstract shipOrder(): void

  constructor(order: Order) {
    this.order = order
  }
}

class CancelledOrderState extends State {
  public cancelOrder() {
    console.log('This order is already cancelled.')
    this.order.setState(this.order.cancelledOrderState)
  }

  public verifyPayment() {
    console.log('The order is cancelled, you cannot pay anymore.')
  }

  public shipOrder() {
    console.log('The order is cancelled, you cannot ship it anymore.')
  }
}

class PaymentPendingState extends State {
  cancelOrder() {
    console.log('Cancelling your unpaid order...')
    this.order.setState(this.order.cancelledOrderState)
  }

  verifyPayment() {
    console.log('Payment verified! Shipping soon.')
    this.order.setState(this.order.orderBeingPrepared)
  }
  shipOrder() {
    console.log('Cannot ship order when payment is pending.')
  }
}

class OrderBeingPrepared extends State {
  cancelOrder() {
    console.log('Cancelling your order... You will be refunded.')
    this.order.setState(this.order.cancelledOrderState)
  }
  verifyPayment() {
    console.log('Payment is already verified.')
  }
  shipOrder() {
    console.log('Shipping your order now...')
    this.order.setState(this.order.orderShipedState)
  }
}

class OrderShippedState extends State {
  cancelOrder() {
    console.log('You cannot cancel an order that has been shipped.')
  }
  verifyPayment() {
    console.log('Payment is already verified.')
  }
  shipOrder() {
    console.log('Order is already shipped.')
  }
}

class StateExample {
  order: Order

  constructor() {
    this.order = new Order()
    this.run()
  }

  run(): void {
    this.order.cancelledOrderState
    this.order.getCurrentState().verifyPayment()
    this.order.getCurrentState().shipOrder()
    this.order.getCurrentState().cancelOrder()

    console.log('Order state: ' + this.order.getCurrentState().constructor.name)
  }
}

new StateExample()
