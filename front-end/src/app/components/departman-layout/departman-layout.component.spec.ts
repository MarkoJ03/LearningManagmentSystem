import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanLayoutComponent } from './departman-layout.component';

describe('DepartmanLayoutComponent', () => {
  let component: DepartmanLayoutComponent;
  let fixture: ComponentFixture<DepartmanLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmanLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
