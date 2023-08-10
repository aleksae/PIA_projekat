import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router:Router) { }

  k_ime:string;
  lozinka:string;
  data = ['admin', 'administrator']
  greska:string
  poruka:string
  ngOnInit(): void {
  }
  prijava(){
    if(!this.k_ime || !this.lozinka){
      this.poruka="Унесите све податке"
      return;
    }
    if(this.k_ime!=this.data[0] || this.lozinka!=this.data[1]){
      this.poruka="Погрешни подаци"
      return;
    }
    localStorage.setItem('admin', 'administrator')
    this.router.navigate(['admin/pocetna'])

  }

}
