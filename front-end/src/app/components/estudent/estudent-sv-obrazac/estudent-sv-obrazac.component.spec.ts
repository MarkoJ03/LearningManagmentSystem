import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentSvObrazacComponent } from './estudent-sv-obrazac.component';

describe('EstudentSvObrazacComponent', () => {
  let component: EstudentSvObrazacComponent;
  let fixture: ComponentFixture<EstudentSvObrazacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentSvObrazacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentSvObrazacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
