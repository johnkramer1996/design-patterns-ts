class StockOffer {
  private stockShares = 0
  private stockSymbol = ''
  private colleagueCode = 0

  constructor(numOfShares: number, stock: string, collCode: number) {
    this.stockShares = numOfShares
    this.stockSymbol = stock
    this.colleagueCode = collCode
  }

  public getstockShares() {
    return this.stockShares
  }
  public getStockSymbol() {
    return this.stockSymbol
  }
  public getCollCode() {
    return this.colleagueCode
  }
}

abstract class Colleague {
  private mediator: Mediator
  private colleagueCode: number

  constructor(newMediator: Mediator) {
    this.mediator = newMediator
    this.mediator.addColleague(this)
  }

  public saleOffer(stock: string, shares: number) {
    this.mediator.saleOffer(stock, shares, this.colleagueCode)
  }

  public buyOffer(stock: string, shares: number) {
    this.mediator.buyOffer(stock, shares, this.colleagueCode)
  }

  public setCollCode(collCode: number) {
    this.colleagueCode = collCode
  }
}

class GormanSlacks extends Colleague {
  constructor(newMediator: Mediator) {
    super(newMediator)
    console.log('Gorman Slacks signed up with the stockexchange')
  }
}

class JTPoorman extends Colleague {
  constructor(newMediator: Mediator) {
    super(newMediator)

    console.log('JT Poorman signed up with the stockexchange')
  }
}

interface Mediator {
  saleOffer(stock: string, shares: number, collCode: number): void
  buyOffer(stock: string, shares: number, collCode: number): void
  addColleague(colleague: Colleague): void
}

class StockMediator implements Mediator {
  private colleagues: Colleague[] = []
  private stockBuyOffers: StockOffer[] = []
  private stockSaleOffers: StockOffer[] = []

  private colleagueCodes: number = 0

  constructor() {}

  addColleague(newColleague: Colleague) {
    this.colleagues.push(newColleague)
    this.colleagueCodes++
    newColleague.setCollCode(this.colleagueCodes)
  }

  public saleOffer(stock: string, shares: number, collCode: number) {
    for (let i = 0; i < this.stockBuyOffers.length; i++) {
      const offer = this.stockBuyOffers[i]
      if (offer.getStockSymbol() == stock && offer.getstockShares() == shares) {
        console.log(
          shares + ' shares of ' + stock + ' sold to colleague code ' + offer.getCollCode(),
        )

        this.stockBuyOffers.splice(i, 1)

        return
      }
    }

    console.log(shares + ' shares of ' + stock + ' added to inventory')
    this.stockSaleOffers.push(new StockOffer(shares, stock, collCode))
  }

  buyOffer(stock: string, shares: number, collCode: number) {
    for (let i = 0; i < this.stockSaleOffers.length; i++) {
      const offer = this.stockSaleOffers[i]
      if (offer.getStockSymbol() == stock && offer.getstockShares() == shares) {
        console.log(
          shares + ' shares of ' + stock + ' bought by colleague code ' + offer.getCollCode(),
        )

        this.stockSaleOffers.splice(i, 1)
        return
      }
    }
    console.log(shares + ' shares of ' + stock + ' added to inventory')
    this.stockBuyOffers.push(new StockOffer(shares, stock, collCode))
  }

  getstockOfferings() {
    console.log('Stocks for Sale')

    for (const offer of this.stockSaleOffers) {
      console.log(offer.getstockShares() + ' of ' + offer.getStockSymbol())
    }

    console.log('Stock Buy Offers')

    for (const offer of this.stockBuyOffers) {
      console.log(offer.getstockShares() + ' of ' + offer.getStockSymbol())
    }
  }
}

class ExampleMediator {
  constructor() {
    const nyse: StockMediator = new StockMediator()
    const broker: GormanSlacks = new GormanSlacks(nyse)
    const broker2: JTPoorman = new JTPoorman(nyse)

    broker.saleOffer('MSFT', 100)
    broker.saleOffer('GOOG', 50)

    broker2.buyOffer('MSFT', 100)
    broker2.saleOffer('NRG', 10)

    broker.buyOffer('NRG', 10)

    nyse.getstockOfferings()
  }
}

new ExampleMediator()
