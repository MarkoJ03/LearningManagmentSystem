import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentAktivnostiComponent } from './estudent-aktivnosti.component';

describe('EstudentAktivnostiComponent', () => {
  let component: EstudentAktivnostiComponent;
  let fixture: ComponentFixture<EstudentAktivnostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentAktivnostiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentAktivnostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
