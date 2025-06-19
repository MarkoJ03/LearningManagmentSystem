import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanComponent } from './departman.component';

describe('DepartmanComponent', () => {
  let component: DepartmanComponent;
  let fixture: ComponentFixture<DepartmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
