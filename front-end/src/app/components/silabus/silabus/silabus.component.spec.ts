import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusComponent } from './silabus.component';

describe('SilabusComponent', () => {
  let component: SilabusComponent;
  let fixture: ComponentFixture<SilabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
