import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendariComponent } from './kalendari.component';

describe('KalendariComponent', () => {
  let component: KalendariComponent;
  let fixture: ComponentFixture<KalendariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalendariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalendariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
