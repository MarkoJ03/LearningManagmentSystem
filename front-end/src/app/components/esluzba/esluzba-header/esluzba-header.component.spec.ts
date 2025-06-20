import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsluzbaHeaderComponent } from './esluzba-header.component';

describe('EsluzbaHeaderComponent', () => {
  let component: EsluzbaHeaderComponent;
  let fixture: ComponentFixture<EsluzbaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsluzbaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsluzbaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
