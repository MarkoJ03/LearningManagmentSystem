import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikObjaveComponent } from './enastavnik-objave.component';

describe('EnastavnikObjaveComponent', () => {
  let component: EnastavnikObjaveComponent;
  let fixture: ComponentFixture<EnastavnikObjaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikObjaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikObjaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
