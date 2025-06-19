import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvObrazacFormaComponent } from './sv-obrazac-forma.component';

describe('SvObrazacFormaComponent', () => {
  let component: SvObrazacFormaComponent;
  let fixture: ComponentFixture<SvObrazacFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvObrazacFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvObrazacFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
