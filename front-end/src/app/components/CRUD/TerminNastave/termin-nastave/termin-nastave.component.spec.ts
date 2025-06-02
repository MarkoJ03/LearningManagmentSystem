import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminNastaveComponent } from './termin-nastave.component';

describe('TerminNastaveComponent', () => {
  let component: TerminNastaveComponent;
  let fixture: ComponentFixture<TerminNastaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminNastaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminNastaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
