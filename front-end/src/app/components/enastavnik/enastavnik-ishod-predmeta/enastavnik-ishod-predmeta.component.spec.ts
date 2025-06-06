import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnastavnikIshodPredmetaComponent } from './enastavnik-ishod-predmeta.component';

describe('EnastavnikIshodPredmetaComponent', () => {
  let component: EnastavnikIshodPredmetaComponent;
  let fixture: ComponentFixture<EnastavnikIshodPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnastavnikIshodPredmetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnastavnikIshodPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
