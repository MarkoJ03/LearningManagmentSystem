import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipZvanjaComponent } from './tip-zvanja.component';

describe('TipZvanjaComponent', () => {
  let component: TipZvanjaComponent;
  let fixture: ComponentFixture<TipZvanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipZvanjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipZvanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
