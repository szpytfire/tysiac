import { InMemoryDb } from './db/in-memory-db'
import { createGame } from './api/create-game'
import { IContext } from './context/interfaces'
import { createPlayer } from './api/create-player'
import { getPlayerCards } from './api/get-player-cards'
import { GAME_DURATION } from './domain/interfaces'
import { startGame } from './api/start-game'
import { getHasNextBidPlayer } from "./api/get-has-next-bid-player";
import { getNextBidPlayer } from "./api/get-next-bid-player";
import { getMusikPlayer } from "./api/get-musik-player";
import prompt from 'prompt';
import { createUserBid } from "./api/create-user-bid";

const play = async () => {
  // Switch db depending on how you want to play
  const db = new InMemoryDb()
  const context: IContext = {db}

  prompt.start();

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

  const musikPlayer = await getMusikPlayer(context, game.id, 0);

  console.log('musik player', musikPlayer);

  let hasNextBidPlayer = await getHasNextBidPlayer(context, game.id, 0);

  while (hasNextBidPlayer) {
    const nextBidPlayer = await getNextBidPlayer(context, game.id, 0);

    console.log('next bid player', nextBidPlayer);

    const res = await prompt.get(['bid']);

    await createUserBid(context, game.id, 0, {userId: nextBidPlayer, value: Number(res.bid)})

    hasNextBidPlayer = await getHasNextBidPlayer(context, game.id, 0);
  }

}

play()