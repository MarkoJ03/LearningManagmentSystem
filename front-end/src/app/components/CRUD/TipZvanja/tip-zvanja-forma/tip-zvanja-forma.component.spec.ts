import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipZvanjaFormaComponent } from './tip-zvanja-forma.component';

describe('TipZvanjaFormaComponent', () => {
  let component: TipZvanjaFormaComponent;
  let fixture: ComponentFixture<TipZvanjaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipZvanjaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipZvanjaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
