import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatedraLayoutComponent } from './katedra-layout.component';

describe('KatedraLayoutComponent', () => {
  let component: KatedraLayoutComponent;
  let fixture: ComponentFixture<KatedraLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatedraLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatedraLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
