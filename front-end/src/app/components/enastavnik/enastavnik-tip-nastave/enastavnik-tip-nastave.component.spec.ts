import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikTipNastaveComponent } from './enastavnik-tip-nastave.component';

describe('EnastavnikTipNastaveComponent', () => {
  let component: EnastavnikTipNastaveComponent;
  let fixture: ComponentFixture<EnastavnikTipNastaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikTipNastaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikTipNastaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
