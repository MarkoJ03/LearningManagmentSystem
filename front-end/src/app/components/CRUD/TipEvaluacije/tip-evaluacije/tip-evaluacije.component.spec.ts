import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipEvaluacijeComponent } from './tip-evaluacije.component';

describe('TipEvaluacijeComponent', () => {
  let component: TipEvaluacijeComponent;
  let fixture: ComponentFixture<TipEvaluacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipEvaluacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipEvaluacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
