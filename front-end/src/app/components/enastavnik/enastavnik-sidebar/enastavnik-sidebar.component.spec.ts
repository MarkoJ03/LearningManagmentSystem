import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikSidebarComponent } from './enastavnik-sidebar.component';

describe('EnastavnikSidebarComponent', () => {
  let component: EnastavnikSidebarComponent;
  let fixture: ComponentFixture<EnastavnikSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
