import { IDatabase } from './interfaces'
import { IGame } from '../domain/interfaces'

// TODO: make this more into a GameRepository
export class InMemoryDb implements IDatabase {
  private games: { [key: string]: IGame } = {}

  async findOne(gameId: string): Promise<IGame> {
    return this.games[gameId] as IGame
  }

  async upsert(game: IGame): Promise<IGame> {
    if (game.id === '') {
      game.id = this.getGameId()
    }

    this.games[game.id] = game
    console.log('upsert', this.games)
    return this.games[game.id]
  }

  private getGameId(): string {
    return Math.floor(Math.random() * 100000).toString()
  }
}