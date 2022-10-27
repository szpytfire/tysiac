import type { IGame, IUser, IRound } from './interfaces'
import { Deck, NUM_HIDDEN_CARDS, NUM_USER_ROUND_CARDS } from './Deck'

class Game implements IGame {
  rounds: IRound[]
  users: IUser[]

  public constructor(private numRounds: number) {
    this.users = []
  }

  public addUser(user: IUser): void {
    this.users = [...this.users, user]
  }

  public start() {
    let rounds: IRound[] = []

    for (let i = 0; i < this.numRounds; i ++) {
      const deck = new Deck()
      const round: IRound = {
        bids: [],
        roundOrder: {
          player1: i === 0 ? this.users[0].id : rounds[i - 1].roundOrder.player3,
          player2: i === 0 ? this.users[1].id : rounds[i - 1].roundOrder.player1,
          player3: i === 0 ? this.users[2].id : rounds[i - 1].roundOrder.player2,
        },
        hiddenHand: {
          cards: deck.getNCards(NUM_HIDDEN_CARDS)
        },
        tricks: [], // TODO
        userRoundHands: [
          {userId: this.users[0].id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
          {userId: this.users[1].id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
          {userId: this.users[2].id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
        ]
      }

      rounds.push(round)
    }

    this.rounds = rounds
  }
}