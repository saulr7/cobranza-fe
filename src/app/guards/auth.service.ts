import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private loginService: LoginService
    , public router: Router) {}
  canActivate(): boolean {



    if (this.loginService.IsLogIn()) 
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
    }
}

}
