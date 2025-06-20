import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigeComponent } from './knjige.component';

describe('KnjigeComponent', () => {
  let component: KnjigeComponent;
  let fixture: ComponentFixture<KnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnjigeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
