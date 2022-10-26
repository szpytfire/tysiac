interface Game {
  users: User[]
  totalScores: TotalScore[]
  rounds: Round[]
}

interface User {
  id: string
  totalScore: TotalScore
}

interface TotalScore {
  value: number
}

interface Round {
  tricks: Trick[]
  userRoundHands: UserRoundHand[]
  hiddenHand: HiddenHand[]
  bids: Bid[]
  roundOrder: RoundOrder
}

interface RoundOrder {
  player1: User
  player2: User
  player3: User
}

interface Bid {
  user: User
  value: number
}

interface Trick {
  user: User
  value: number
}

interface UserRoundHand {
  user: User
  cards: Card[]
}

interface HiddenHand {
  cards: Card[]
}

interface Card {
  suit: Suit
  rank: Rank
  value: number
}

enum Suit {
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
  SPADE = 'SPADE',
  CLUB = 'CLUB',
}

enum Rank {
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
  ACE = 'ACE',
}

