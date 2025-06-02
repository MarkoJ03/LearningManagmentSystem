import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentObjaveComponent } from './estudent-objave.component';

describe('EstudentObjaveComponent', () => {
  let component: EstudentObjaveComponent;
  let fixture: ComponentFixture<EstudentObjaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentObjaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentObjaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
