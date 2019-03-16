import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHayDatosComponent } from './no-hay-datos.component';

describe('NoHayDatosComponent', () => {
  let component: NoHayDatosComponent;
  let fixture: ComponentFixture<NoHayDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoHayDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoHayDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
