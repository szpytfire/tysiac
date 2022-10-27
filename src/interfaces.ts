export interface IGame {
  users: IUser[]
  rounds: IRound[]
}

export interface IUser {
  id: string
  totalScore: TotalScore
}

interface TotalScore {
  value: number
}

export interface IRound {
  tricks: Trick[]
  userRoundHands: UserRoundHand[]
  hiddenHand: HiddenHand
  bids: Bid[]
  roundOrder: RoundOrder
}

interface RoundOrder {
  player1: string // user id
  player2: string // user id
  player3: string // user id
}

interface Bid {
  userId: string
  value: number
}

interface Trick {
  userId: string
  value: number
}

interface UserRoundHand {
  userId: string
  cards: ICard[]
}

interface HiddenHand {
  cards: ICard[]
}

export interface ICard {
  suit: ISuit
  rank: IRank
  value: number
}

export enum ISuit {
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
  SPADE = 'SPADE',
  CLUB = 'CLUB',
}

export enum IRank {
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

