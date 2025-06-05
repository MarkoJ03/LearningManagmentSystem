import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipProgramaComponent } from './tip-programa.component';

describe('TipProgramaComponent', () => {
  let component: TipProgramaComponent;
  let fixture: ComponentFixture<TipProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
