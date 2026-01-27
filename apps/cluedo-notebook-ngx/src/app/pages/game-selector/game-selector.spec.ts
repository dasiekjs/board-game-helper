import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameSelector } from './game-selector';

describe('GameSelector', () => {
  let component: GameSelector;
  let fixture: ComponentFixture<GameSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(GameSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
