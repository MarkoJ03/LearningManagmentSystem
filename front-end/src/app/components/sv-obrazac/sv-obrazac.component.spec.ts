import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvObrazacComponent } from './sv-obrazac.component';

describe('SvObrazacComponent', () => {
  let component: SvObrazacComponent;
  let fixture: ComponentFixture<SvObrazacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvObrazacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvObrazacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
