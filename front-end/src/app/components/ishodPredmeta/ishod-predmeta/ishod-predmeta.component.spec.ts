import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshodPredmetaComponent } from './ishod-predmeta.component';

describe('IshodPredmetaComponent', () => {
  let component: IshodPredmetaComponent;
  let fixture: ComponentFixture<IshodPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IshodPredmetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshodPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
