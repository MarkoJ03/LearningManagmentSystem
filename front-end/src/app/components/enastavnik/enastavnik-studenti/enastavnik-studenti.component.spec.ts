import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikStudentiComponent } from './enastavnik-studenti.component';

describe('EnastavnikStudentiComponent', () => {
  let component: EnastavnikStudentiComponent;
  let fixture: ComponentFixture<EnastavnikStudentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikStudentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikStudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
