import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoviComponent } from './gradovi.component';

describe('GradoviComponent', () => {
  let component: GradoviComponent;
  let fixture: ComponentFixture<GradoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradoviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
