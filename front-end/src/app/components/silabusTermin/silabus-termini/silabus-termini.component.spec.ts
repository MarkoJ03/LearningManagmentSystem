import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusTerminiComponent } from './silabus-termini.component';

describe('SilabusTerminiComponent', () => {
  let component: SilabusTerminiComponent;
  let fixture: ComponentFixture<SilabusTerminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusTerminiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusTerminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
