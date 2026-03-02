import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notebook } from './notebook';
import {Signal, signal} from "@angular/core";
import {Assignments, CluedoState, Player} from "../../+state/state.model";
import {cluedoStore} from "../../+state/store";
import {getTranslocoModule} from "../../../test/transloco-testing.module";

type CluedoSignalState = {
  [K in keyof CluedoState]: Signal<CluedoState[K]>
} & {
  // computed
  canAddMorePlayer: Signal<boolean>,
  playersInGame: Signal<Player[]>
};

describe('Notebook', () => {
  let component: Notebook;
  let fixture: ComponentFixture<Notebook>;

  let mockedState: CluedoSignalState;

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        Notebook
      ],
      providers: [
        { provide: cluedoStore, useValue: mockedState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Notebook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: add more tests
});
