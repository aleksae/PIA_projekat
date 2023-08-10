import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private route: Router) { 
    
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("klijent"))){
      this.route.navigate(["klijent/profil"])
    }else if(JSON.parse(localStorage.getItem("agencija"))){
      this.route.navigate(["agencija/profil"])
    }
  }

}
