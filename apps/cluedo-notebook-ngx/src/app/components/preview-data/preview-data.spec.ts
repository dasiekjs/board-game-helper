import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewData } from './preview-data';
import {Signal, signal} from "@angular/core";
import {Assignments, CluedoState, Player} from "../../+state/state.model";
import {cluedoStore} from "../../+state/store";
import {MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {getTranslocoModule} from "../../../test/transloco-testing.module";

type CluedoSignalState = {
  [K in keyof CluedoState]: Signal<CluedoState[K]>
} & {
  // computed
  canAddMorePlayer: Signal<boolean>,
  playersInGame: Signal<Player[]>,
  summary: Signal<any>
};

describe('PreviewData', () => {
  let component: PreviewData;
  let fixture: ComponentFixture<PreviewData>;

  const mockedState: CluedoSignalState = {
    gameDefinition: signal<string>('classic'),
    players: signal<Player[]>([]),
    suspects: signal<string[]>([]),
    rooms: signal<string[]>([]),
    items: signal<string[]>([]),
    assignments: signal<Assignments>({}),
    canAddMorePlayer: signal<boolean>(true),
    playersInGame: signal<Player[]>([]),
    summary: signal<unknown>({
      players: [],
      groups: {
        suspectsGroup: [],
        itemsGroup: [],
        roomsGroup: []
      }
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        MatBottomSheetModule,
        PreviewData
      ],
      providers: [
        { provide: cluedoStore, useValue: mockedState },
        { provide: MatBottomSheetRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO Add more tests
});
