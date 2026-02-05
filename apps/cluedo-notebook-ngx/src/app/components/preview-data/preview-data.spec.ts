import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewData } from './preview-data';

describe('PreviewData', () => {
  let component: PreviewData;
  let fixture: ComponentFixture<PreviewData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewData],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
