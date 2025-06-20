import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmaniComponent } from './departmani.component';

describe('DepartmaniComponent', () => {
  let component: DepartmaniComponent;
  let fixture: ComponentFixture<DepartmaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmaniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
