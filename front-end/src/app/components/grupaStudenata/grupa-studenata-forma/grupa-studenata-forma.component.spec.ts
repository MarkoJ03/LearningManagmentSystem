import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupaStudenataFormaComponent } from './grupa-studenata-forma.component';

describe('GrupaStudenataFormaComponent', () => {
  let component: GrupaStudenataFormaComponent;
  let fixture: ComponentFixture<GrupaStudenataFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupaStudenataFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupaStudenataFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
