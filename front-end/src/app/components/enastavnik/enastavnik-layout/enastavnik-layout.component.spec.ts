import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikLayoutComponent } from './enastavnik-layout.component';

describe('EnastavnikLayoutComponent', () => {
  let component: EnastavnikLayoutComponent;
  let fixture: ComponentFixture<EnastavnikLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
