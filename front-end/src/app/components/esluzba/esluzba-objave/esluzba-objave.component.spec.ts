import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsluzbaObjaveComponent } from './esluzba-objave.component';

describe('EsluzbaObjaveComponent', () => {
  let component: EsluzbaObjaveComponent;
  let fixture: ComponentFixture<EsluzbaObjaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsluzbaObjaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsluzbaObjaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
