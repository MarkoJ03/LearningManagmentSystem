import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsluzbaLayoutComponent } from './esluzba-layout.component';

describe('EsluzbaLayoutComponent', () => {
  let component: EsluzbaLayoutComponent;
  let fixture: ComponentFixture<EsluzbaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsluzbaLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsluzbaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
