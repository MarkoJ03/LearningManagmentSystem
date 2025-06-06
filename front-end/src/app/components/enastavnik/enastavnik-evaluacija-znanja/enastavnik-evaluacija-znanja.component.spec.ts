import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikEvaluacijaZnanjaComponent } from './enastavnik-evaluacija-znanja.component';

describe('EnastavnikEvaluacijaZnanjaComponent', () => {
  let component: EnastavnikEvaluacijaZnanjaComponent;
  let fixture: ComponentFixture<EnastavnikEvaluacijaZnanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikEvaluacijaZnanjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikEvaluacijaZnanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
