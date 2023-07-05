import { IBid, IHiddenHand, IPlayer, IRound, IRoundOrder, ITrick, IUserRoundHand } from './interfaces'
import { Deck, NUM_HIDDEN_CARDS, NUM_USER_ROUND_CARDS } from './Deck'

export const DEFAULT_BID = 100
export const PASS_BID = 0

export class Round implements IRound {
  tricks: ITrick[]
  userRoundHands: IUserRoundHand[]
  hiddenHand: IHiddenHand
  bids: IBid
  roundOrder: IRoundOrder

  public constructor({player1Id, player2Id, player3Id}: IRoundOrder) {
    const deck = new Deck()

    this.bids = {
      [player3Id]: DEFAULT_BID
    }

    this.roundOrder = {
      player1Id: player3Id,
      player2Id: player1Id,
      player3Id: player2Id,
    }

    this.hiddenHand = {
      cards: deck.getNCards(NUM_HIDDEN_CARDS)
    }

    this.tricks = []

    // Order of players does not matter here -- cards are shuffled anyway
    this.userRoundHands = [
      {userId: player1Id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
      {userId: player2Id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
      {userId: player3Id, cards: deck.getNCards(NUM_USER_ROUND_CARDS)},
    ]
  }
}