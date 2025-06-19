import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjeFormaComponent } from './obavestenje-forma.component';

describe('ObavestenjeFormaComponent', () => {
  let component: ObavestenjeFormaComponent;
  let fixture: ComponentFixture<ObavestenjeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavestenjeFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavestenjeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
