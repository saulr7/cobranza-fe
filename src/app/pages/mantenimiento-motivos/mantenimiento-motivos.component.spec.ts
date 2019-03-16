import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoMotivosComponent } from './mantenimiento-motivos.component';

describe('MantenimientoMotivosComponent', () => {
  let component: MantenimientoMotivosComponent;
  let fixture: ComponentFixture<MantenimientoMotivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoMotivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoMotivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
