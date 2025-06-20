import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikStudentiPredmetComponent } from './enastavnik-studenti-predmet.component';

describe('EnastavnikStudentiPredmetComponent', () => {
  let component: EnastavnikStudentiPredmetComponent;
  let fixture: ComponentFixture<EnastavnikStudentiPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikStudentiPredmetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikStudentiPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
