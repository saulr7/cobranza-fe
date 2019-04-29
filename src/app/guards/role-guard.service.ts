import { Injectable } from '@angular/core';
import { Router,  ActivatedRouteSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(
      private loginService: LoginService
    , public router: Router) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole1;
    
    const tokenPayload = this.loginService.TokenPayload();
    
    if ( !this.loginService.IsLogIn() ||   tokenPayload.PerfilId !== expectedRole ) 
      {
        this.router.navigate(['/misSolicitudes']);
        return false;
      }
    return true;
  }






}
