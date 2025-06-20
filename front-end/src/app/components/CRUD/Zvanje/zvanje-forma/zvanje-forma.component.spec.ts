import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZvanjeFormaComponent } from './zvanje-forma.component';

describe('ZvanjeFormaComponent', () => {
  let component: ZvanjeFormaComponent;
  let fixture: ComponentFixture<ZvanjeFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZvanjeFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZvanjeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
