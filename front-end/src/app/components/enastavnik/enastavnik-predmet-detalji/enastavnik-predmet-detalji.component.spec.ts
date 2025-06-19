import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikPredmetDetaljiComponent } from './enastavnik-predmet-detalji.component';

describe('EnastavnikPredmetDetaljiComponent', () => {
  let component: EnastavnikPredmetDetaljiComponent;
  let fixture: ComponentFixture<EnastavnikPredmetDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikPredmetDetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikPredmetDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
