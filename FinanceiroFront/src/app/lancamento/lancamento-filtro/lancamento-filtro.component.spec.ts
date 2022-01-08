import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoFiltroComponent } from './lancamento-filtro.component';

describe('LancamentoFiltroComponent', () => {
  let component: LancamentoFiltroComponent;
  let fixture: ComponentFixture<LancamentoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
