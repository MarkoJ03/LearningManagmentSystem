import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsluzbaSidebarComponent } from './esluzba-sidebar.component';

describe('EsluzbaSidebarComponent', () => {
  let component: EsluzbaSidebarComponent;
  let fixture: ComponentFixture<EsluzbaSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsluzbaSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsluzbaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
