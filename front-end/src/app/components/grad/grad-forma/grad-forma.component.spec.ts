import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradFormaComponent } from './grad-forma.component';

describe('GradFormaComponent', () => {
  let component: GradFormaComponent;
  let fixture: ComponentFixture<GradFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
