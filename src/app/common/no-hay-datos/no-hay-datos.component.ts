import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-hay-datos',
  templateUrl: './no-hay-datos.component.html',
  styleUrls: ['./no-hay-datos.component.css']
})
export class NoHayDatosComponent implements OnInit {

  @Input() public noHayDatosParaMostar : boolean;

  constructor() { }

  ngOnInit() {
  }

}
