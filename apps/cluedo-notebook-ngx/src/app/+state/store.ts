import {AssignmentStatus, CluedoState, Player} from "./state.model";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {GameDefinition} from "../models/game-definition";
import {effect} from "@angular/core";

const initialState: CluedoState = {
  gameDefinition: 'classic',
  players: [],
  //
  suspects: [],
  rooms: [],
  items: [],
  //
  assignments: {}
}

const LOCAL_STORAGE_KEY = 'dasiekjs:cluedo-notebook-state';

const getPlayerValue = (value: AssignmentStatus | null): string => {
  return value === null ? 'not-marked' : value;
}

export const cluedoStore = signalStore(
  withState(initialState),
  withComputed(({ players, suspects, rooms, items, assignments }) => ({
    playersInGame: () => players(),
    canAddMorePlayer: () => players().length < 6,
    summary: () => {
      const _assignments = assignments();

      const _players = players();
      const _suspects = suspects();
      const _items = items();
      const _rooms = rooms();

      const suspectsGroup: { element: string, results: string[]}[] = [];
      const itemsGroup: { element: string, results: string[]}[] = [];
      const roomsGroup: { element: string, results: string[]}[] = [];

      for (const suspect of _suspects) {
        const result: string[] = [];
        for (const player of _players) {
          result.push(getPlayerValue(_assignments[suspect]?.[player.id] ?? null))
        }
        suspectsGroup.push({
          element: suspect,
          results: result
        });
      }
      for (const item of _items) {
        const result: string[] = [];
        for (const player of _players) {
          result.push(getPlayerValue(_assignments[item]?.[player.id] ?? null))
        }
        itemsGroup.push({
          element: item,
          results: result
        });
      }
      for (const room of _rooms) {
        const result: string[] = [
        ];
        for (const player of _players) {
          result.push(getPlayerValue(_assignments[room]?.[player.id] ?? null))
        }
        roomsGroup.push({
          element: room,
          results: result
        });
      }
      return {
        players: _players.map((v) => v.name),
        groups: {
          suspectsGroup,
          itemsGroup,
          roomsGroup
        }
      };
    }
  })),
  withHooks({
    onInit: (store) => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const localStorageState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
        patchState(store, {
          assignments: localStorageState?.assignments ?? {},
          players: localStorageState?.players ?? []
        });
      }
      effect(() => {
        const assignments = store.assignments();
        const players = store.players();
        const gameDefinition = store.gameDefinition();
        const _savingStore = {
          assignments: assignments,
          players: players,
          gameDefinition: gameDefinition,
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_savingStore));
      });
    }
  }),
  withMethods((state) => ({
    addPlayer: (name: string) => {
      if (!state.canAddMorePlayer()) {
        return;
      }
      const player = {id: state.players().length + 1, name};
      patchState(state, (store) => ({
        ...store,
        players: [
          ...store.players,
          player
        ]
      }))
    },
    selectField: (player: string | number, element: string, status: AssignmentStatus = null) => {
      patchState(state, (store) => ({
        ...store,
        assignments: {
          ...store.assignments,
          [element]: {
            ...store.assignments[element],
            [''+player]: status as AssignmentStatus
          }
        }
      }))
    },
    selectGame: (type: string, definition: GameDefinition) => {
      const {definition: {suspects, rooms, items}} = definition;
      const currentPlayer: Player = {id: 1, name: 'Me'};

      patchState(state, (store) => ({
        ...store,
        gameDefinition: type,
        players: state.players().length ? state.players() : [currentPlayer],
        suspects, rooms, items,
        assignments: store.gameDefinition !== type ? {} : store.assignments
      }));
    },
    resetGame: () => {
      patchState(state, {
        players: [{id: 1, name: 'Me'}],
        assignments: {}
      });
    },
    resetWithoutPlayers: () => {
      patchState(state, {assignments: {}});
    }
  }))
)
