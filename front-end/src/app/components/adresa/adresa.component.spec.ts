import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaComponent } from './adresa.component';

describe('AdresaComponent', () => {
  let component: AdresaComponent;
  let fixture: ComponentFixture<AdresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
