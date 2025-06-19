import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendarComponent } from './kalendar.component';

describe('KalendarComponent', () => {
  let component: KalendarComponent;
  let fixture: ComponentFixture<KalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
