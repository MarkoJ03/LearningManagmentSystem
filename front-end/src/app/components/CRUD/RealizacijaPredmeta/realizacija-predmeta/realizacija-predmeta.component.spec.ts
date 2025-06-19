import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizacijaPredmetaComponent } from './realizacija-predmeta.component';

describe('RealizacijaPredmetaComponent', () => {
  let component: RealizacijaPredmetaComponent;
  let fixture: ComponentFixture<RealizacijaPredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizacijaPredmetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizacijaPredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
