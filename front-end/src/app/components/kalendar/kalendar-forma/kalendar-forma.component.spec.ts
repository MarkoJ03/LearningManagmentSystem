import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendarFormaComponent } from './kalendar-forma.component';

describe('KalendarFormaComponent', () => {
  let component: KalendarFormaComponent;
  let fixture: ComponentFixture<KalendarFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalendarFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalendarFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
