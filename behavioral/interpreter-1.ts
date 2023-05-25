interface Expression {
  interpret(): number
}

class NumberExpression implements Expression {
  private param: number

  constructor(_param: string) {
    this.param = parseInt(_param)
  }

  interpret(): number {
    return this.param
  }
}

class AdditionExpression implements Expression {
  private param1: Expression
  private param2: Expression

  constructor(_param1: Expression, _param2: Expression) {
    this.param1 = _param1
    this.param2 = _param2
  }

  interpret(): number {
    return this.param1.interpret() + this.param2.interpret()
  }
}

class SubtractionExpression implements Expression {
  private param1: Expression
  private param2: Expression

  constructor(_param1: Expression, _param2: Expression) {
    this.param1 = _param1
    this.param2 = _param2
  }

  interpret(): number {
    return this.param1.interpret() - this.param2.interpret()
  }
}

class Parser {
  expressions: Expression[] = []

  parse(input: string): number {
    try {
      input.split(' ').forEach((symbol: string) => {
        if (symbol.match(/[0-9]+$/)) this.expressions.push(new NumberExpression(symbol))
        else if (symbol.match(/[+-]+$/)) {
          const expression1 = this.expressions.pop() || new NumberExpression('0')
          const expression2 = this.expressions.pop() || new NumberExpression('0')

          let result = 0

          switch (symbol) {
            case '+':
              result = new AdditionExpression(expression1, expression2).interpret()
              break

            case '-':
              result = new SubtractionExpression(expression1, expression2).interpret()
              break
          }

          this.expressions.push(new NumberExpression(result.toString()))
        }
      })

      return this.expressions.pop()?.interpret() || 0
    } catch (err) {
      console.log(err)
      console.log('invalid input')
      return 0
    }
  }
}

class InterpreterExample {
  parser: Parser

  constructor() {
    this.parser = new Parser()
    this.run()
  }

  run(): void {
    console.log(this.parser.parse('2 2 +'))
    console.log(this.parser.parse('2 2 -'))
    console.log(this.parser.parse('1 2 3 - +'))
  }
}

new InterpreterExample()
