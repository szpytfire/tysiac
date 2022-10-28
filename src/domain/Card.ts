import { ICard, IRank, ISuit } from './interfaces'

export class Card implements ICard {
  value: number

  public constructor(public rank: IRank, public suit: ISuit) {
    this.value = this.calculateCardValue()
  }

  private calculateCardValue (): number {
    switch (this.rank) {
      case 'NINE': return 0
      case 'JACK': return 2
      case 'ACE': return 11
      case 'TEN': return 10
      case 'QUEEN': return 4
      case 'KING': return 5
      default: throw new Error('')
    }
  }
}