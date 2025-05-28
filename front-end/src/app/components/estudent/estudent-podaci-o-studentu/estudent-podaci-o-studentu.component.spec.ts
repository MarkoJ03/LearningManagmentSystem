import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentPodaciOStudentuComponent } from './estudent-podaci-o-studentu.component';

describe('EstudentPodaciOStudentuComponent', () => {
  let component: EstudentPodaciOStudentuComponent;
  let fixture: ComponentFixture<EstudentPodaciOStudentuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentPodaciOStudentuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentPodaciOStudentuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
