import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiNaGodiniComponent } from './studenti-na-godini.component';

describe('StudentiNaGodiniComponent', () => {
  let component: StudentiNaGodiniComponent;
  let fixture: ComponentFixture<StudentiNaGodiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentiNaGodiniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentiNaGodiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
