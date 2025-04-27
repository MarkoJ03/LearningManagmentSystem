import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjavaCardComponent } from './objava-card.component';

describe('ObjavaCardComponent', () => {
  let component: ObjavaCardComponent;
  let fixture: ComponentFixture<ObjavaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjavaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjavaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
