import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodinaStudijaFormaComponent } from './godina-studija-forma.component';

describe('GodinaStudijaFormaComponent', () => {
  let component: GodinaStudijaFormaComponent;
  let fixture: ComponentFixture<GodinaStudijaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GodinaStudijaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodinaStudijaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
