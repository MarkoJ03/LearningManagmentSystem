import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjaveComponent } from './objave.component';

describe('ObjaveComponent', () => {
  let component: ObjaveComponent;
  let fixture: ComponentFixture<ObjaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
