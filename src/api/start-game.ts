import { IContext } from '../context/interfaces'
import { IGame } from '../domain/interfaces'
import { Game } from '../domain/Game'

export const startGame = async (context: IContext, gameId: string): Promise<boolean> => {
  const {db} = context
  // TODO: create more of a repository pattern here
  const _game = await db.findOne(gameId)
  const game = Game.rehydrate(_game)

  game.seedGame()
  await db.upsert(game)

  return true
}