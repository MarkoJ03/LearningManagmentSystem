import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverzitetFooterComponent } from './univerzitet-footer.component';

describe('UniverzitetFooterComponent', () => {
  let component: UniverzitetFooterComponent;
  let fixture: ComponentFixture<UniverzitetFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverzitetFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniverzitetFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
