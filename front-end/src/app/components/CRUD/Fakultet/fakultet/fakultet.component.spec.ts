import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetComponent } from './fakultet.component';

describe('FakultetComponent', () => {
  let component: FakultetComponent;
  let fixture: ComponentFixture<FakultetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
