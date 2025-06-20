import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikFormaComponent } from './korisnik-forma.component';

describe('KorisnikFormaComponent', () => {
  let component: KorisnikFormaComponent;
  let fixture: ComponentFixture<KorisnikFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnikFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
