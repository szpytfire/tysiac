import { IContext } from '../context/interfaces'
import { Game } from '../domain/Game'
import { PlayerHandDTO } from './dtos'

export const getPlayerCards = async (context: IContext, gameId: string, round: number, userId: string): Promise<PlayerHandDTO> => {
  const {db} = context
  // TODO: create more of a repository pattern here
  const _game = await db.findOne(gameId)
  const game = Game.rehydrate(_game)

  return game.getPlayerCards(round, userId)
}