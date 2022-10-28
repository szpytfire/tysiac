import type { ICard, IGame, IPlayer, IRound, IRoundOrder } from './interfaces'
import { GAME_DURATION } from './interfaces'
import { Round } from './Round'

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
}