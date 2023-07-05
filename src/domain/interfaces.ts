export interface IGame {
  id: string
  players: IPlayer[]
  rounds: IRound[]
  duration: GAME_DURATION
}

export interface IPlayer {
  userId: string
  totalScore: number
}

export interface IRound {
  tricks: ITrick[]
  userRoundHands: IUserRoundHand[]
  hiddenHand: IHiddenHand
  bids: IBid
  roundOrder: IRoundOrder
}

export interface IRoundOrder {
  player1Id: string // user id
  player2Id: string // user id
  player3Id: string // user id
}

export interface IBid {
  [userId: string]: number
}

export interface ITrick {
  userId: string
  value: number
}

export interface IUserRoundHand {
  userId: string
  cards: ICard[]
}

export interface IHiddenHand {
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

export enum GAME_DURATION {
  QUICK = 3,
  MEDIUM = 9,
  LONG = 12,
}