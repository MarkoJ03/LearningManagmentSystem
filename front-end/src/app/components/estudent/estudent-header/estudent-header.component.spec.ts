import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentHeaderComponent } from './estudent-header.component';

describe('EstudentHeaderComponent', () => {
  let component: EstudentHeaderComponent;
  let fixture: ComponentFixture<EstudentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
