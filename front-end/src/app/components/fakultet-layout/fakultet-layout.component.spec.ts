import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetLayoutComponent } from './fakultet-layout.component';

describe('FakultetLayoutComponent', () => {
  let component: FakultetLayoutComponent;
  let fixture: ComponentFixture<FakultetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
