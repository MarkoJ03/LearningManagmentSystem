import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaFormaComponent } from './adresa-forma.component';

describe('AdresaFormaComponent', () => {
  let component: AdresaFormaComponent;
  let fixture: ComponentFixture<AdresaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
