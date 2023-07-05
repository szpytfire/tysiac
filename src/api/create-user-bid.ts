import { IContext } from '../context/interfaces'
import { Game } from '../domain/Game'
import { BidDTO, PlayerHandDTO } from './dtos'
import { IBid, IPlayer } from "../domain/interfaces";

export const createUserBid = async (context: IContext, gameId: string, round: number, bid: BidDTO): Promise<boolean> => {
    const {db} = context
    // TODO: create more of a repository pattern here
    const _game = await db.findOne(gameId)
    const game = Game.rehydrate(_game)

    game.submitBid(round, bid);
    await db.upsert(game)

    return true;
}