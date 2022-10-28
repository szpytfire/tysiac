import { IPlayer } from './interfaces'

export class Player implements IPlayer {
  public constructor(public userId: string, public totalScore = 0) {
  }
}