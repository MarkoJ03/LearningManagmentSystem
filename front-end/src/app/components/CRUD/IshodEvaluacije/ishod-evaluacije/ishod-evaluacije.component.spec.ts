import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodEvaluacijeComponent } from './ishod-evaluacije.component';

describe('IshodEvaluacijeComponent', () => {
  let component: IshodEvaluacijeComponent;
  let fixture: ComponentFixture<IshodEvaluacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodEvaluacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodEvaluacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
