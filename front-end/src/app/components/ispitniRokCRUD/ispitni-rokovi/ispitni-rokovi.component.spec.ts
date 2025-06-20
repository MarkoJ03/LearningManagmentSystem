import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitniRokoviComponent } from './ispitni-rokovi.component';

describe('IspitniRokoviComponent', () => {
  let component: IspitniRokoviComponent;
  let fixture: ComponentFixture<IspitniRokoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IspitniRokoviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IspitniRokoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
