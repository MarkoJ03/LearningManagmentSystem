import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentIspitiComponent } from './estudent-ispiti.component';

describe('EstudentIspitiComponent', () => {
  let component: EstudentIspitiComponent;
  let fixture: ComponentFixture<EstudentIspitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentIspitiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentIspitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
