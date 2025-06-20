import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentskeSluzbeComponent } from './studentske-sluzbe.component';

describe('StudentskeSluzbeComponent', () => {
  let component: StudentskeSluzbeComponent;
  let fixture: ComponentFixture<StudentskeSluzbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentskeSluzbeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentskeSluzbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
