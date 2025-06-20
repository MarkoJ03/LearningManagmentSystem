import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikPredmetiComponent } from './enastavnik-predmeti.component';

describe('EnastavnikPredmetiComponent', () => {
  let component: EnastavnikPredmetiComponent;
  let fixture: ComponentFixture<EnastavnikPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikPredmetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
