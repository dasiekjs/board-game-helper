import {Player, Players} from "./player.model";

export interface History {
  date: Date;
  roundNumber: number;
  changes: Players;
  penaltyPointsFor: Player | null
}
