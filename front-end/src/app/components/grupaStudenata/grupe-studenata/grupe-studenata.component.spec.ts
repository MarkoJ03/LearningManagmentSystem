import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupeStudenataComponent } from './grupe-studenata.component';

describe('GrupeStudenataComponent', () => {
  let component: GrupeStudenataComponent;
  let fixture: ComponentFixture<GrupeStudenataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupeStudenataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupeStudenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
