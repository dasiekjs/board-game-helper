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

export const cluedoStore = signalStore(
  withState(initialState),
  withComputed(({ players }) => ({
    players: () => players(),
    canAddMorePlayer: () => players().length < 6
  })),
  withHooks({
    onInit: (store) => {
      let localStorageState: Pick<CluedoState, 'players' | 'assignments'> | null = null;
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        localStorageState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
        patchState(store, {
          assignments: localStorageState?.assignments ?? {},
          players: localStorageState?.players ?? []
        });
      }
      effect(() => {
        const assignments = store.assignments();
        const players = store.players();

        const _savingStore = {
          assignments: localStorageState?.assignments ?? assignments,
          players: localStorageState?.players ?? players
        }
        localStorageState = null;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_savingStore));
      });
    }
  }),
  withMethods((state) => ({
    addPlayer: (name: string) => {
      const player = {id: state.players().length + 1, name};
      patchState(state, (store) => ({
        ...store,
        players: [
          ...store.players,
          player
        ]
      }))
    },
    selectField: (player: string | number, element: string) => {
      const elementStatus = state.assignments()?.[element]?.[player] ?? null;
      let status = null;
      if (elementStatus === null) {
        status = 'have';
      } else if (elementStatus === 'have') {
        status = 'may-have';
      }

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
        suspects, rooms, items
      }));
    },
    resetGame: () => {
      patchState(state, {
        players: [{id: 1, name: 'Me'}],
        assignments: {}
      });
    }
  }))
)
