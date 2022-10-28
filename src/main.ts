import { InMemoryDb } from './db/in-memory-db'
import { createGame } from './api/create-game'
import { IContext } from './context/interfaces'
import { createPlayer } from './api/create-player'
import { getPlayerCards } from './api/get-player-cards'
import { GAME_DURATION } from './domain/interfaces'
import { startGame } from './api/start-game'

const play = async () => {
  // Switch db depending on how you want to play
  const db = new InMemoryDb()
  const context: IContext = {db}

  // Create game
  const game = await createGame(context, GAME_DURATION.QUICK)

  // Add players
  await createPlayer(context, game.id, 'Tom')
  await createPlayer(context, game.id, 'Martyna')
  await createPlayer(context, game.id, 'Dzydz')

  // Start game
  await startGame(context, game.id)

  // Get player hands
  const cards1 = await getPlayerCards(context, game.id, 0, 'Tom')
  const cards2 = await getPlayerCards(context, game.id, 0, 'Martyna')
  const cards3 = await getPlayerCards(context, game.id, 0, 'Dzydz')

  console.log(cards1)
  console.log(cards2)
  console.log(cards3)
}

play()