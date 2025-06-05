import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacijeZnanjaComponent } from './evaluacije-znanja.component';

describe('EvaluacijeZnanjaComponent', () => {
  let component: EvaluacijeZnanjaComponent;
  let fixture: ComponentFixture<EvaluacijeZnanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacijeZnanjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacijeZnanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
