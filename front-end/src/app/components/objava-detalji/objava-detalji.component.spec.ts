import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjavaDetaljiComponent } from './objava-detalji.component';

describe('ObjavaDetaljiComponent', () => {
  let component: ObjavaDetaljiComponent;
  let fixture: ComponentFixture<ObjavaDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjavaDetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjavaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
