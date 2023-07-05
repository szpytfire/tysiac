import { IContext } from '../context/interfaces'
import { Game } from '../domain/Game'
import { Player } from '../domain/User'

export const createPlayer = async (context: IContext, gameId: string, userId: string): Promise<boolean> => {
  const {db} = context
  // TODO: create more of a repository pattern here
  const _game = await db.findOne(gameId)
  const game = Game.rehydrate(_game)
  const player = new Player(userId)
  game.addPlayer(player)
  await db.upsert(game)

  return true
}