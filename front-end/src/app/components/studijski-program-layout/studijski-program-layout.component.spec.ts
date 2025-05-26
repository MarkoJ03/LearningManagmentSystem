import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijskiProgramLayoutComponent } from './studijski-program-layout.component';

describe('StudijskiProgramLayoutComponent', () => {
  let component: StudijskiProgramLayoutComponent;
  let fixture: ComponentFixture<StudijskiProgramLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudijskiProgramLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudijskiProgramLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
