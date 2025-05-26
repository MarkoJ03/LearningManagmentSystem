import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetHeaderComponent } from './fakultet-header.component';

describe('FakultetHeaderComponent', () => {
  let component: FakultetHeaderComponent;
  let fixture: ComponentFixture<FakultetHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
