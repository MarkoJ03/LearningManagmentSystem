import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjeComponent } from './obavestenje.component';

describe('ObavestenjeComponent', () => {
  let component: ObavestenjeComponent;
  let fixture: ComponentFixture<ObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavestenjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
