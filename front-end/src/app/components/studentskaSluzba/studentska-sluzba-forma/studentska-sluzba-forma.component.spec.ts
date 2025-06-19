import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentskaSluzbaFormaComponent } from './studentska-sluzba-forma.component';

describe('StudentskaSluzbaFormaComponent', () => {
  let component: StudentskaSluzbaFormaComponent;
  let fixture: ComponentFixture<StudentskaSluzbaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentskaSluzbaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentskaSluzbaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
