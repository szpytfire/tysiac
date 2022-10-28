import { Game } from '../domain/Game'
import { IContext } from '../context/interfaces'
import { GameDTO } from './dtos'
import { GAME_DURATION } from '../domain/interfaces'

export const createGame = async (context: IContext, numRounds: GAME_DURATION): Promise<GameDTO> => {
  const {db} = context
  const _game = new Game(numRounds)
  const {id} = await db.upsert(_game)

  return {id}
}