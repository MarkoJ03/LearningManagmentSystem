import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjavaFormaComponent } from './objava-forma.component';

describe('ObjavaFormaComponent', () => {
  let component: ObjavaFormaComponent;
  let fixture: ComponentFixture<ObjavaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjavaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjavaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
