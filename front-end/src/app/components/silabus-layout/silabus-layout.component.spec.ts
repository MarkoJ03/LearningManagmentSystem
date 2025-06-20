import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusLayoutComponent } from './silabus-layout.component';

describe('SilabusLayoutComponent', () => {
  let component: SilabusLayoutComponent;
  let fixture: ComponentFixture<SilabusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
