import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikObavestenjaPredmetComponent } from './enastavnik-obavestenja-predmet.component';

describe('EnastavnikObavestenjaPredmetComponent', () => {
  let component: EnastavnikObavestenjaPredmetComponent;
  let fixture: ComponentFixture<EnastavnikObavestenjaPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikObavestenjaPredmetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikObavestenjaPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
