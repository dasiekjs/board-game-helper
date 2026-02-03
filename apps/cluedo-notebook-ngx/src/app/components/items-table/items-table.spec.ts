import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsTable } from './items-table';
import {Signal, signal} from "@angular/core";
import {Assignments, CluedoState, Player} from "../../+state/state.model";
import {cluedoStore} from "../../+state/store";

type CluedoSignalState = {
  [K in keyof CluedoState]: Signal<CluedoState[K]>
} & {
  // computed
  canAddMorePlayer: Signal<boolean>,
  playersInGame: Signal<Player[]>
};

describe('ItemsTable', () => {
  let component: ItemsTable;
  let fixture: ComponentFixture<ItemsTable>;
  let mockedState: CluedoSignalState;

  mockedState = {
    gameDefinition: signal<string>('classic'),
    players: signal<Player[]>([]),
    suspects: signal<string[]>([]),
    rooms: signal<string[]>([]),
    items: signal<string[]>([]),
    assignments: signal<Assignments>({}),
    canAddMorePlayer: signal<boolean>(true),
    playersInGame: signal<Player[]>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsTable],
      providers: [
        { provide: cluedoStore, useValue: mockedState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   // TODO Add more tests
});
