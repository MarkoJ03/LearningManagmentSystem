import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikIshodEvaluacijeComponent } from './enastavnik-ishod-evaluacije.component';

describe('EnastavnikIshodEvaluacijeComponent', () => {
  let component: EnastavnikIshodEvaluacijeComponent;
  let fixture: ComponentFixture<EnastavnikIshodEvaluacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikIshodEvaluacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikIshodEvaluacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
