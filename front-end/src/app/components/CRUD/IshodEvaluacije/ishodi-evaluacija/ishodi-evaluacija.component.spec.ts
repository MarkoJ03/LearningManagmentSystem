import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodiEvaluacijaComponent } from './ishodi-evaluacija.component';

describe('IshodiEvaluacijaComponent', () => {
  let component: IshodiEvaluacijaComponent;
  let fixture: ComponentFixture<IshodiEvaluacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodiEvaluacijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodiEvaluacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
