import {Player, Players} from "../models/player.model";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";

type PlayingStatus = 'collect-players' | 'in-progress' | 'finished';
type FinalizeRound = {
  playerId: Player['id'];
  points: number;
}

type DreamsState = {
  players: Players;
  history: History[];
  status: PlayingStatus;
}

const initialState: DreamsState = {
  players: [],
  history: [],
  status: 'collect-players',
}

export const DreamsStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    addPlayer: (playerName: string) => {

      const playerId = store.players().length + 1;

      if (playerId > 5) {
        return; // do not add more players than 5;
      }

      const newPlayer: Player = {
        id: playerId,
        name: playerName,
        points: 0,
      }

      patchState(store, (store) => ({
        ...store,
        players: [...store.players, newPlayer]
      }));
    },
    startGame: () => {
      if (store.players().length < 2) {
        return; // do not start game if there are less than 2 players
      }
      patchState(store, { status: 'in-progress' });
    },
    finishRound: (data: FinalizeRound[], finalizedBy?: Player['id']) => {
      if (store.status() !== 'in-progress') {
        return;
      }

    }
  }))
)
