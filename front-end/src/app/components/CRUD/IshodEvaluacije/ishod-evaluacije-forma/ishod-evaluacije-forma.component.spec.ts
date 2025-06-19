import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodEvaluacijeFormaComponent } from './ishod-evaluacije-forma.component';

describe('IshodEvaluacijeFormaComponent', () => {
  let component: IshodEvaluacijeFormaComponent;
  let fixture: ComponentFixture<IshodEvaluacijeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodEvaluacijeFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodEvaluacijeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
