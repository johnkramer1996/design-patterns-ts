interface SortingStrategy {
  sort(data: number[]): number[]
}

class SimpleSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    return data.sort((a, b) => a - b)
  }
}

class ReverseSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    return data.sort((a, b) => b - a)
  }
}

class Sorter {
  private strategy: SortingStrategy

  setStrategy(strategy: SortingStrategy) {
    this.strategy = strategy
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data) || []
  }
}

class StrategyExample {
  sorter: Sorter

  constructor() {
    this.sorter = new Sorter()
    this.run()
  }

  run(): void {
    const data = [5, 2, 1, 10, 7, 3]

    this.sorter.setStrategy(new SimpleSortStrategy())
    console.log(this.sorter.sort(data))

    this.sorter.setStrategy(new ReverseSortStrategy())
    console.log(this.sorter.sort(data))
  }
}
new StrategyExample()
