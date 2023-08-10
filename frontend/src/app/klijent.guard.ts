import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KlijentGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    if(route.data['uloga']=="sve"){
      if(localStorage.getItem("klijent") || localStorage.getItem("agencija")){
        return true;
      }
    }
    if(localStorage.getItem(route.data['uloga'])){
      return true;
    }
    return this.router.navigate(['prava_pristupa_prestup']);
    
  }
  
}
