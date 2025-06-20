import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacijaZnanjaComponent } from './evaluacija-znanja.component';

describe('EvaluacijaZnanjaComponent', () => {
  let component: EvaluacijaZnanjaComponent;
  let fixture: ComponentFixture<EvaluacijaZnanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacijaZnanjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacijaZnanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
