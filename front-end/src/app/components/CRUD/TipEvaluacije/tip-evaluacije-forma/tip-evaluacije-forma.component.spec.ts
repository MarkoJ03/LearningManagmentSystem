import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipEvaluacijeFormaComponent } from './tip-evaluacije-forma.component';

describe('TipEvaluacijeFormaComponent', () => {
  let component: TipEvaluacijeFormaComponent;
  let fixture: ComponentFixture<TipEvaluacijeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipEvaluacijeFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipEvaluacijeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
