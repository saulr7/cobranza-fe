import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html',
  styleUrls: ['./estado-solicitud.component.css']
})
export class EstadoSolicitudComponent implements OnInit {

  @Input() public estadoId: number = 1;

  constructor() { }

  ngOnInit() {
  }

}
