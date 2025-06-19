import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobljaComponent } from './osoblja.component';

describe('OsobljaComponent', () => {
  let component: OsobljaComponent;
  let fixture: ComponentFixture<OsobljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsobljaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsobljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
