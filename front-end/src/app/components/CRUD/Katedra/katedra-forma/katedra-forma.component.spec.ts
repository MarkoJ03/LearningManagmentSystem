import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatedraFormaComponent } from './katedra-forma.component';

describe('KatedraFormaComponent', () => {
  let component: KatedraFormaComponent;
  let fixture: ComponentFixture<KatedraFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatedraFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatedraFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
