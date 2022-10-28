import { ICard, IRank, ISuit } from './interfaces'
import { Card } from './Card'

export const NUM_HIDDEN_CARDS = 3
export const NUM_USER_ROUND_CARDS = 7

export class Deck {
  public constructor(private cards: ICard[] = []) {
    this.build()
    this.shuffle()
  }

  private build() {
    this.cards = Object.values(ISuit).map((suit) => {
      return Object.values(IRank).map((rank) => new Card(rank, suit))
    }).reduce((acc, curr) => ([...acc, ...curr]), [] as ICard[])
  }

  private shuffle() {
    this.cards = this.cards
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value)
  }

  public getNCards(n: number) {
    return this.cards.splice(0, n)
  }
}