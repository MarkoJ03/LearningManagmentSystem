import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciComponent } from './korisnici.component';

describe('KorisniciComponent', () => {
  let component: KorisniciComponent;
  let fixture: ComponentFixture<KorisniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisniciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
