import { Component } from '@angular/core';
import {LoginService} from './services/login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Control De Acceso';

  constructor(
    private loginService : LoginService
  )
  {
    // loginService.IsLogIn();
  }
}
