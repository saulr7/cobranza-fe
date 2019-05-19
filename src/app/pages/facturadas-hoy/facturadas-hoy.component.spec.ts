import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturadasHoyComponent } from './facturadas-hoy.component';

describe('FacturadasHoyComponent', () => {
  let component: FacturadasHoyComponent;
  let fixture: ComponentFixture<FacturadasHoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturadasHoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturadasHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
