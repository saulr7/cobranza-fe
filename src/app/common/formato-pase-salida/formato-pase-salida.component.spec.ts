import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoPaseSalidaComponent } from './formato-pase-salida.component';

describe('FormatoPaseSalidaComponent', () => {
  let component: FormatoPaseSalidaComponent;
  let fixture: ComponentFixture<FormatoPaseSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoPaseSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoPaseSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
