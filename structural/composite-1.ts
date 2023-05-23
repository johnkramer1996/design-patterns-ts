interface ArmyObject {
  seq: String
  operate(): void
}

class Team implements ArmyObject {
  seq: String
  private _soldiers: ArmyObject[]

  constructor(seq: String) {
    this.seq = seq
    this._soldiers = []
  }

  operate(): void {
    console.log(`Team: ${this.seq} operates`)
    this._soldiers.map((soldier: ArmyObject) => soldier.operate())
  }

  addSoldier(newSoldier: ArmyObject) {
    const soldiers = this._soldiers.filter((soldier: ArmyObject) => soldier.seq === newSoldier.seq)
    if (soldiers.length) {
      console.log('The soldier is already in the team')
      return
    }
    console.log(`Soldier: ${newSoldier.seq} comes in ${this.seq}`)
    this._soldiers.push(newSoldier)
  }

  soldierGone(deadSoldier: ArmyObject) {
    const index = this._soldiers.findIndex(
      (soldier: ArmyObject, index) => soldier.seq === deadSoldier.seq,
    )
    if (index !== -1) {
      console.log(`Soldier: ${deadSoldier.seq} died in the fight`)
      this._soldiers.splice(index, 1)
      return
    }
    console.log('No one dies')
  }
}

class Soldier implements ArmyObject {
  seq: String

  constructor(seq: String) {
    this.seq = seq
  }

  operate() {
    console.log(`Soldier: ${this.seq} soldier operates`)
  }
}

const team = new Team('Team 1')
const specialSquad = new Team('Team 2')

const soldierJoe = new Soldier('Joe')
const soldierJames = new Soldier('James')
const soldierRoy = new Soldier('Roy')
const specialForceTommy = new Soldier('Tommy')
team.addSoldier(soldierJoe)
team.addSoldier(soldierJames)
team.addSoldier(soldierRoy)
specialSquad.addSoldier(specialForceTommy)

team.soldierGone(soldierJames)
team.operate()
specialSquad.operate()
