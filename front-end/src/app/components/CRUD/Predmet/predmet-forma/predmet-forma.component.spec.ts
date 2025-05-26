import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetFormaComponent } from './predmet-forma.component';

describe('PredmetFormaComponent', () => {
  let component: PredmetFormaComponent;
  let fixture: ComponentFixture<PredmetFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredmetFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
