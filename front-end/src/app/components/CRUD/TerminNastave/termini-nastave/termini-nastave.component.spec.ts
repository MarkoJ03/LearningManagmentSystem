import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminiNastaveComponent } from './termini-nastave.component';

describe('TerminiNastaveComponent', () => {
  let component: TerminiNastaveComponent;
  let fixture: ComponentFixture<TerminiNastaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminiNastaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminiNastaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
