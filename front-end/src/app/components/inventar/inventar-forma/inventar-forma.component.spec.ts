import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarFormaComponent } from './inventar-forma.component';

describe('InventarFormaComponent', () => {
  let component: InventarFormaComponent;
  let fixture: ComponentFixture<InventarFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
