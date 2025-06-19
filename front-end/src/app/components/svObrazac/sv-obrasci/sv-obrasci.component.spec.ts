import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvObrasciComponent } from './sv-obrasci.component';

describe('SvObrasciComponent', () => {
  let component: SvObrasciComponent;
  let fixture: ComponentFixture<SvObrasciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvObrasciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvObrasciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
