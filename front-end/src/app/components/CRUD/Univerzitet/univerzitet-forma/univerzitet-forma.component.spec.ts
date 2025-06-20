import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverzitetFormaComponent } from './univerzitet-forma.component';

describe('UniverzitetFormaComponent', () => {
  let component: UniverzitetFormaComponent;
  let fixture: ComponentFixture<UniverzitetFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverzitetFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniverzitetFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
