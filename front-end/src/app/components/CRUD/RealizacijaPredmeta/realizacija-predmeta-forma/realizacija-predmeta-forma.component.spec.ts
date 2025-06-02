import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacijaPredmetaFormaComponent } from './realizacija-predmeta-forma.component';

describe('RealizacijaPredmetaFormaComponent', () => {
  let component: RealizacijaPredmetaFormaComponent;
  let fixture: ComponentFixture<RealizacijaPredmetaFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizacijaPredmetaFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizacijaPredmetaFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
