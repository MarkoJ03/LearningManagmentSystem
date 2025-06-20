import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudentPrijavaIspitaComponent } from './estudent-prijava-ispita.component';

describe('EstudentPrijavaIspitaComponent', () => {
  let component: EstudentPrijavaIspitaComponent;
  let fixture: ComponentFixture<EstudentPrijavaIspitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudentPrijavaIspitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudentPrijavaIspitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
