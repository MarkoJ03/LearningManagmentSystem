import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZvanjeComponent } from './zvanje.component';

describe('ZvanjeComponent', () => {
  let component: ZvanjeComponent;
  let fixture: ComponentFixture<ZvanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZvanjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZvanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
