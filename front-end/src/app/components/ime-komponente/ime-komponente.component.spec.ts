import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImeKomponenteComponent } from './ime-komponente.component';

describe('ImeKomponenteComponent', () => {
  let component: ImeKomponenteComponent;
  let fixture: ComponentFixture<ImeKomponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImeKomponenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImeKomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
