import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetLayoutComponent } from './predmet-layout.component';

describe('PredmetLayoutComponent', () => {
  let component: PredmetLayoutComponent;
  let fixture: ComponentFixture<PredmetLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredmetLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
