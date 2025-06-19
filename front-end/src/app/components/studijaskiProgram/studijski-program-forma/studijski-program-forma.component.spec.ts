import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijskiProgramFormaComponent } from './studijski-program-forma.component';

describe('StudijskiProgramFormaComponent', () => {
  let component: StudijskiProgramFormaComponent;
  let fixture: ComponentFixture<StudijskiProgramFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijskiProgramFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijskiProgramFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
