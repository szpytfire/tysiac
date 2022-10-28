import { IGame } from '../domain/interfaces'

export interface IDatabase {
  upsert: (game: IGame) => Promise<IGame>
  findOne: (gameId: string) => Promise<IGame>
}