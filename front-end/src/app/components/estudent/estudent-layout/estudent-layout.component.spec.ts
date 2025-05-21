import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentLayoutComponent } from './estudent-layout.component';

describe('EstudentLayoutComponent', () => {
  let component: EstudentLayoutComponent;
  let fixture: ComponentFixture<EstudentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
