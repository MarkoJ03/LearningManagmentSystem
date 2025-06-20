import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverzitetHeaderComponent } from './univerzitet-header.component';

describe('UniverzitetHeaderComponent', () => {
  let component: UniverzitetHeaderComponent;
  let fixture: ComponentFixture<UniverzitetHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverzitetHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniverzitetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
