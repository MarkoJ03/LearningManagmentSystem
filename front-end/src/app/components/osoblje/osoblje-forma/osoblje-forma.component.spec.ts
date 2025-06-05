import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobljeFormaComponent } from './osoblje-forma.component';

describe('OsobljeFormaComponent', () => {
  let component: OsobljeFormaComponent;
  let fixture: ComponentFixture<OsobljeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsobljeFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsobljeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
