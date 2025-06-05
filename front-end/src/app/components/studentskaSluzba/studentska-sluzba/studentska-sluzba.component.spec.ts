import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentskaSluzbaComponent } from './studentska-sluzba.component';

describe('StudentskaSluzbaComponent', () => {
  let component: StudentskaSluzbaComponent;
  let fixture: ComponentFixture<StudentskaSluzbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentskaSluzbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentskaSluzbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
