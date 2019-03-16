import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEntradasSalidasComponent } from './reporte-entradas-salidas.component';

describe('ReporteEntradasSalidasComponent', () => {
  let component: ReporteEntradasSalidasComponent;
  let fixture: ComponentFixture<ReporteEntradasSalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEntradasSalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEntradasSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
