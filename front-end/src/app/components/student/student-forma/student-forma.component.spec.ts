import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormaComponent } from './student-forma.component';

describe('StudentFormaComponent', () => {
  let component: StudentFormaComponent;
  let fixture: ComponentFixture<StudentFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
