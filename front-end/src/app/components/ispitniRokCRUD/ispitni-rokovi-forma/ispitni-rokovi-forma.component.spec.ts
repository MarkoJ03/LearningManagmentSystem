import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitniRokoviFormaComponent } from './ispitni-rokovi-forma.component';

describe('IspitniRokoviFormaComponent', () => {
  let component: IspitniRokoviFormaComponent;
  let fixture: ComponentFixture<IspitniRokoviFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IspitniRokoviFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IspitniRokoviFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
