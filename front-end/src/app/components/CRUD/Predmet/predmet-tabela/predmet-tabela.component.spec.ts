import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetTabelaComponent } from './predmet-tabela.component';

describe('PredmetTabelaComponent', () => {
  let component: PredmetTabelaComponent;
  let fixture: ComponentFixture<PredmetTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredmetTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
