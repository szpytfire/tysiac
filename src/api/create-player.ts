import { IContext } from '../context/interfaces'
import { Game } from '../domain/Game'
import { Player } from '../domain/User'

export const createPlayer = async (context: IContext, gameId: string, userId: string): Promise<boolean> => {
  const {db} = context
  // TODO: create more of a repository pattern here
  const _game = await db.findOne(gameId)
  console.log('here0!', _game)
  const game = Game.rehydrate(_game)
  console.log('here!', game)
  const player = new Player(userId)
  game.addPlayer(player)
  console.log('here3!', game)
  await db.upsert(game)

  return true
}