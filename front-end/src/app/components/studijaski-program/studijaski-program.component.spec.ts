import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijaskiProgramComponent } from './studijaski-program.component';

describe('StudijaskiProgramComponent', () => {
  let component: StudijaskiProgramComponent;
  let fixture: ComponentFixture<StudijaskiProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijaskiProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijaskiProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
