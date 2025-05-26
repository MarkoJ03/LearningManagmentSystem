import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdreseComponent } from './adrese.component';

describe('AdreseComponent', () => {
  let component: AdreseComponent;
  let fixture: ComponentFixture<AdreseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdreseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdreseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
