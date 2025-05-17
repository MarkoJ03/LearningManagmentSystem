import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerickaFormaComponent } from './genericka-forma.component';

describe('GenerickaFormaComponent', () => {
  let component: GenerickaFormaComponent;
  let fixture: ComponentFixture<GenerickaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerickaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerickaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
