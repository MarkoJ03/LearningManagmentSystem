import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariComponent } from './inventari.component';

describe('InventariComponent', () => {
  let component: InventariComponent;
  let fixture: ComponentFixture<InventariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
