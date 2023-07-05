import type { ICard, IGame, IPlayer, IRound, IRoundOrder } from './interfaces'
import { GAME_DURATION, IBid } from './interfaces'
import { DEFAULT_BID, PASS_BID, Round } from './Round'

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
    return this.rounds[round].bids[0].userId;
  }

  public hasNextBidUser(round: number): boolean {
    const bids = this.rounds[round].bids;

    return bids.length !== 3 || bids.find(d => d.value !== DEFAULT_BID && d.value !== PASS_BID) !== undefined;
  }

  public getNextBidUser(round: number): IPlayer['userId'] {
    const r = this.rounds[round];
    const bids = r.bids;

    if (bids.length === 1) {
      return r.roundOrder.player2Id;
    }

    if (bids.length === 2) {
      return r.roundOrder.player3Id;
    }

    const nextBid = bids.find(d => d.value !== PASS_BID);

    if (!nextBid) {
      throw new Error('Next bid is undefined');
    }

    return nextBid.userId;
  }

  public submitBid(round: number, {userId, value}: IBid): boolean {
    const r = this.rounds[round];

    if (r.bids.length < 3) {
      r.bids.push({userId, value});
      return true;
    }

    const userBidIdx = r.bids.findIndex(u => userId === u.userId);

    if (userBidIdx === -1) {
      throw new Error(`Cannot find bid for user with id [${userId}]`)
    }

    r.bids[userBidIdx] = {userId, value};

    return true;
  }
}