import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaucnaOblastFormaComponent } from './naucna-oblast-forma.component';

describe('NaucnaOblastFormaComponent', () => {
  let component: NaucnaOblastFormaComponent;
  let fixture: ComponentFixture<NaucnaOblastFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaucnaOblastFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaucnaOblastFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
