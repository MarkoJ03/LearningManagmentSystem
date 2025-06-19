import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatedraComponent } from './katedra.component';

describe('KatedraComponent', () => {
  let component: KatedraComponent;
  let fixture: ComponentFixture<KatedraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatedraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatedraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
