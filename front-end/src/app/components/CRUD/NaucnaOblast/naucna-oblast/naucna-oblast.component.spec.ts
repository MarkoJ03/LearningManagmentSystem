import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaucnaOblastComponent } from './naucna-oblast.component';

describe('NaucnaOblastComponent', () => {
  let component: NaucnaOblastComponent;
  let fixture: ComponentFixture<NaucnaOblastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaucnaOblastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaucnaOblastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
