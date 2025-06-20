import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusiComponent } from './silabusi.component';

describe('SilabusiComponent', () => {
  let component: SilabusiComponent;
  let fixture: ComponentFixture<SilabusiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
