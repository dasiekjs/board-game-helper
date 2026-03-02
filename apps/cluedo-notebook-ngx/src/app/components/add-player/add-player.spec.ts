import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlayer } from './add-player';
import {MatDialogRef} from "@angular/material/dialog";
import {getTranslocoModule} from "../../../test/transloco-testing.module";

describe('AddPlayer', () => {
  let component: AddPlayer;
  let fixture: ComponentFixture<AddPlayer>;

  const mockDialogRef = {
    close: vi.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        AddPlayer
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO Add more tests
});
