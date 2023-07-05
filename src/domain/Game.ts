import type { ICard, IGame, IPlayer, IRound, IRoundOrder } from './interfaces'
import { GAME_DURATION, IBid } from './interfaces'
import { DEFAULT_BID, PASS_BID, Round } from './Round'
import { BidDTO } from "../api/dtos";

export class Game implements IGame {
  rounds: IRound[]
  players: IPlayer[]
  id: string

  public constructor(public duration: GAME_DURATION) {
    this.players = []
    this.rounds = []
    this.id = ''
  }

  public static rehydrate(game: IGame): Game {
    const _game = new Game(game.duration)
    _game.rounds = game.rounds
    _game.players = game.players
    _game.id = game.id
    return _game
  }

  public addPlayer(user: IPlayer): void {
    // TODO: add rules to only allow 3 players
    this.players = [...this.players, user]
  }

  public seedGame() {
    let rounds: IRound[] = []

    const seedPlayerState: IRoundOrder = {
      player1Id: this.players[1].userId,
      player2Id: this.players[2].userId,
      player3Id: this.players[0].userId
    }

    for (let i = 0; i < this.duration; i++) {
      console.log(i, rounds)
      rounds.push(new Round(i === 0 ? seedPlayerState : rounds[i - 1].roundOrder))
    }

    this.rounds = rounds
  }

  public getPlayerCards(round: number, uid: string): ICard[] {
    // TODO: add some error handling, e.g. if input round length is greater than array length
    return this.rounds[round].userRoundHands.find(({userId}) => uid === userId)!.cards
  }

  public getHiddenCards(round: number): ICard[] {
    return this.rounds[round].hiddenHand.cards;
  }

  public getMusikPlayer(round: number): IPlayer['userId'] {
    return this.rounds[round].roundOrder.player1Id;
  }

  public hasNextBidUser(round: number): boolean {
    const { bids } = this.rounds[round];

    if (Object.keys(bids).length < 3) {
      return true;
    }

    return Object.values(bids).filter(v => v !== PASS_BID).length >= 2;
  }

  public getNextBidUser(round: number): IPlayer['userId'] {
    const { roundOrder, bids } = this.rounds[round];

    const numBids = Object.keys(bids).length;

    if (numBids === 1) {
      return roundOrder.player2Id;
    }

    if (numBids === 2) {
      return roundOrder.player3Id;
    }

    if (bids[roundOrder.player1Id] === DEFAULT_BID) {
      return roundOrder.player1Id;
    }

    const lowest = Object.entries(bids).filter(d => d[1] !== PASS_BID).reduce(
        (acc, loc) => acc[1] < loc[1] ? acc : loc
    )

    return lowest[0];
  }

  public submitBid(round: number, {userId, value}: BidDTO): boolean {
    const r = this.rounds[round];

    r.bids[userId] = value;
    return true;
  }
}