import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotekaFormaComponent } from './biblioteka-forma.component';

describe('BibliotekaFormaComponent', () => {
  let component: BibliotekaFormaComponent;
  let fixture: ComponentFixture<BibliotekaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotekaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotekaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
