import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNaGodiniFormaComponent } from './student-na-godini-forma.component';

describe('StudentNaGodiniFormaComponent', () => {
  let component: StudentNaGodiniFormaComponent;
  let fixture: ComponentFixture<StudentNaGodiniFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNaGodiniFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNaGodiniFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
