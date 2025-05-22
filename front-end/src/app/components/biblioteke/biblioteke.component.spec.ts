import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotekeComponent } from './biblioteke.component';

describe('BibliotekeComponent', () => {
  let component: BibliotekeComponent;
  let fixture: ComponentFixture<BibliotekeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotekeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotekeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
