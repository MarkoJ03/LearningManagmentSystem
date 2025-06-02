import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentSidebarComponent } from './estudent-sidebar.component';

describe('EstudentSidebarComponent', () => {
  let component: EstudentSidebarComponent;
  let fixture: ComponentFixture<EstudentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
