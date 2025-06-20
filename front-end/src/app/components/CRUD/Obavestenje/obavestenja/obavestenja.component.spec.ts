import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaComponent } from './obavestenja.component';

describe('ObavestenjaComponent', () => {
  let component: ObavestenjaComponent;
  let fixture: ComponentFixture<ObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavestenjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
