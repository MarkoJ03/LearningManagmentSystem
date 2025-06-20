import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminNastaveFormaComponent } from './termin-nastave-forma.component';

describe('TerminNastaveFormaComponent', () => {
  let component: TerminNastaveFormaComponent;
  let fixture: ComponentFixture<TerminNastaveFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminNastaveFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminNastaveFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
