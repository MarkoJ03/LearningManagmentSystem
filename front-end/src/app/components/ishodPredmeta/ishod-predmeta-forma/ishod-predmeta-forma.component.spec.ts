import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodPredmetaFormaComponent } from './ishod-predmeta-forma.component';

describe('IshodPredmetaFormaComponent', () => {
  let component: IshodPredmetaFormaComponent;
  let fixture: ComponentFixture<IshodPredmetaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodPredmetaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodPredmetaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
