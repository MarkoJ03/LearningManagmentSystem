import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipProgramaFormaComponent } from './tip-programa-forma.component';

describe('TipProgramaFormaComponent', () => {
  let component: TipProgramaFormaComponent;
  let fixture: ComponentFixture<TipProgramaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipProgramaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipProgramaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
