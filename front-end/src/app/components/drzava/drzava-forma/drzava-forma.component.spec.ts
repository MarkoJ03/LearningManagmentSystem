import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrzavaFormaComponent } from './drzava-forma.component';

describe('DrzavaFormaComponent', () => {
  let component: DrzavaFormaComponent;
  let fixture: ComponentFixture<DrzavaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrzavaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrzavaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
