import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaPredmetaComponent } from './obavestenja-predmeta.component';

describe('ObavestenjaPredmetaComponent', () => {
  let component: ObavestenjaPredmetaComponent;
  let fixture: ComponentFixture<ObavestenjaPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavestenjaPredmetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavestenjaPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
