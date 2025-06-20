import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikKalendarComponent } from './enastavnik-kalendar.component';

describe('EnastavnikKalendarComponent', () => {
  let component: EnastavnikKalendarComponent;
  let fixture: ComponentFixture<EnastavnikKalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikKalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikKalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
