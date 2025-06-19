import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikFormaComponent } from './nastavnik-forma.component';

describe('NastavnikFormaComponent', () => {
  let component: NastavnikFormaComponent;
  let fixture: ComponentFixture<NastavnikFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NastavnikFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NastavnikFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
