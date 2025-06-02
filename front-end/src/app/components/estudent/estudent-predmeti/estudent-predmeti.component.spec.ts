import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentPredmetiComponent } from './estudent-predmeti.component';

describe('EstudentPredmetiComponent', () => {
  let component: EstudentPredmetiComponent;
  let fixture: ComponentFixture<EstudentPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentPredmetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
