import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatedreComponent } from './katedre.component';

describe('KatedreComponent', () => {
  let component: KatedreComponent;
  let fixture: ComponentFixture<KatedreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatedreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatedreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
