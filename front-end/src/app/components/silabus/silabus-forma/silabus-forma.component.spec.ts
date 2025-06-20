import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusFormaComponent } from './silabus-forma.component';

describe('SilabusFormaComponent', () => {
  let component: SilabusFormaComponent;
  let fixture: ComponentFixture<SilabusFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
