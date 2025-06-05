import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjavaComponent } from './objava.component';

describe('ObjavaComponent', () => {
  let component: ObjavaComponent;
  let fixture: ComponentFixture<ObjavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
