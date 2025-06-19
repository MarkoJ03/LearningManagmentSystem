import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodineStudijaComponent } from './godine-studija.component';

describe('GodineStudijaComponent', () => {
  let component: GodineStudijaComponent;
  let fixture: ComponentFixture<GodineStudijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GodineStudijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodineStudijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
