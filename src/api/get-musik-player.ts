import { IContext } from '../context/interfaces'
import { Game } from '../domain/Game'
import { PlayerHandDTO } from './dtos'
import { IPlayer } from "../domain/interfaces";

export const getMusikPlayer = async (context: IContext, gameId: string, round: number): Promise<IPlayer['userId']> => {
    const {db} = context
    // TODO: create more of a repository pattern here
    const _game = await db.findOne(gameId)
    const game = Game.rehydrate(_game)

    return game.getMusikPlayer(round);
}