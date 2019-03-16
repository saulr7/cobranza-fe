import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarEntradaSalidaComponent } from './marcar-entrada-salida.component';

describe('MarcarEntradaSalidaComponent', () => {
  let component: MarcarEntradaSalidaComponent;
  let fixture: ComponentFixture<MarcarEntradaSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcarEntradaSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarEntradaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
