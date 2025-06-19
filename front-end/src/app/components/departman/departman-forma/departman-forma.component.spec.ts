import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanFormaComponent } from './departman-forma.component';

describe('DepartmanFormaComponent', () => {
  let component: DepartmanFormaComponent;
  let fixture: ComponentFixture<DepartmanFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmanFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmanFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
