import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodiPredmetaComponent } from './ishodi-predmeta.component';

describe('IshodiPredmetaComponent', () => {
  let component: IshodiPredmetaComponent;
  let fixture: ComponentFixture<IshodiPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodiPredmetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodiPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
