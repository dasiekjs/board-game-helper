import {Player, Players} from "../models/player.model";
import {History} from "../models/history.model";
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
  currentRound: number;
}

const initialState: DreamsState = {
  players: [],
  history: [],
  status: 'collect-players',
  currentRound: 1,
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

      // helper function to find player with fewest points
      let playerWithFewestPoints: Player['id'] | null = null;
      let fewestPoints: number | null = null;

      // flag to verify if we should finalize game
      let shouldFinalizeGame = false;

      const pointsByPlayerId = new Map(
        data.map(({ playerId, points }) => {
          if (fewestPoints === null || points < fewestPoints) {
            playerWithFewestPoints = playerId;
            fewestPoints = points;
          }
          return [playerId, points] as const
        })
      );

      const _players = store.players().map((player) => {
        const points = pointsByPlayerId.get(player.id) ?? 0;

        let newPlayerPoints = player.points + points;
        if (finalizedBy === player.id && player.id !== playerWithFewestPoints) {
          newPlayerPoints += 5;
        }

        if (newPlayerPoints >= 100) {
          shouldFinalizeGame = true;
        }

        return {
          ...player,
          points: newPlayerPoints
        }
      });

      const penaltyPointsFor = (finalizedBy !== null && playerWithFewestPoints !== finalizedBy) ? store.players().find(p => p.id === finalizedBy) : null

      const _historyElement: History = {
        changes: _players,
        date: new Date(),
        roundNumber: store.currentRound(),
        penaltyPointsFor : penaltyPointsFor ?? null,

      }

      patchState(store, {
        players: _players,
        history: [...store.history(), _historyElement],
        currentRound: !shouldFinalizeGame ? store.currentRound() + 1 : store.currentRound(),
        status: shouldFinalizeGame ? 'finished' : 'in-progress',
      })
    }
  }))
)
