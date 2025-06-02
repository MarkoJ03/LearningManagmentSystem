import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetFormaComponent } from './fakultet-forma.component';

describe('FakultetFormaComponent', () => {
  let component: FakultetFormaComponent;
  let fixture: ComponentFixture<FakultetFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
