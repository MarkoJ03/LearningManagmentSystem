import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusTerminComponent } from './silabus-termin.component';

describe('SilabusTerminComponent', () => {
  let component: SilabusTerminComponent;
  let fixture: ComponentFixture<SilabusTerminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusTerminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusTerminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
