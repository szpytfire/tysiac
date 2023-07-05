import { ICard, IGame } from '../domain/interfaces'

export type PlayerHandDTO = ICard[]

export type GameDTO = Pick<IGame, 'id'>

export type BidDTO = {
    userId: string;
    value: number;
}