import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoviProgramaComponent } from './tipovi-programa.component';

describe('TipoviProgramaComponent', () => {
  let component: TipoviProgramaComponent;
  let fixture: ComponentFixture<TipoviProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoviProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoviProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
