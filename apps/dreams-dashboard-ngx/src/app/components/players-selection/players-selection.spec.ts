import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersSelection } from './players-selection';

describe('PlayersSelection', () => {
  let component: PlayersSelection;
  let fixture: ComponentFixture<PlayersSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
