import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotekaComponent } from './biblioteka.component';

describe('BibliotekaComponent', () => {
  let component: BibliotekaComponent;
  let fixture: ComponentFixture<BibliotekaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotekaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotekaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
