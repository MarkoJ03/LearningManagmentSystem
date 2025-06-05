import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobljeComponent } from './osoblje.component';

describe('OsobljeComponent', () => {
  let component: OsobljeComponent;
  let fixture: ComponentFixture<OsobljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsobljeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsobljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
