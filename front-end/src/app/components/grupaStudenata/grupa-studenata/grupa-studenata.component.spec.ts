import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupaStudenataComponent } from './grupa-studenata.component';

describe('GrupaStudenataComponent', () => {
  let component: GrupaStudenataComponent;
  let fixture: ComponentFixture<GrupaStudenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupaStudenataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupaStudenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
