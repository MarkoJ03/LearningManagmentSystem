import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacijaZnanjaFormaComponent } from './evaluacija-znanja-forma.component';

describe('EvaluacijaZnanjaFormaComponent', () => {
  let component: EvaluacijaZnanjaFormaComponent;
  let fixture: ComponentFixture<EvaluacijaZnanjaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacijaZnanjaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacijaZnanjaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
