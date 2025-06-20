import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusTerminFormaComponent } from './silabus-termin-forma.component';

describe('SilabusTerminFormaComponent', () => {
  let component: SilabusTerminFormaComponent;
  let fixture: ComponentFixture<SilabusTerminFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusTerminFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusTerminFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
