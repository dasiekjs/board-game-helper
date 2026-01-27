import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainEntry } from './main-entry';

describe('MainEntry', () => {
  let component: MainEntry;
  let fixture: ComponentFixture<MainEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(MainEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
