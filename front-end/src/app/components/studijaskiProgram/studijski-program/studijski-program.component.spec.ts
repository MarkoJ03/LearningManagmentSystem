import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijskiProgramComponent } from './studijski-program.component';

describe('StudijskiProgramComponent', () => {
  let component: StudijskiProgramComponent;
  let fixture: ComponentFixture<StudijskiProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijskiProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijskiProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
