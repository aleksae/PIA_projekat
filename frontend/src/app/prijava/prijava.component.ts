import { Component, OnInit } from '@angular/core';
import { PrijavljivanjeService } from '../prijavljivanje-service.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private prijavljivanjeService: PrijavljivanjeService, private router: Router) { }

  ngOnInit(): void {
  }

  k_ime: string;
  lozinka: string;
  poruka: string;
  prijava(){
    this.prijavljivanjeService.prijava(this.k_ime, sha512.sha512(this.lozinka)).subscribe((kIzBaze: Korisnik)=>{
      if(kIzBaze!=null){
        if(kIzBaze.hasOwnProperty("odbijen")){
          if(kIzBaze.odbijen==true) this.poruka="Налог је одбијен"
        }
        else if(kIzBaze.odobren==false){
          this.poruka="Налог још увек није одобрен"
        }
        else if(kIzBaze.uloga=="klijent"){
          localStorage.setItem("klijent", JSON.stringify(kIzBaze, function replacer(key, value) {
            if (key === "lozinka" || key === "_id")
              return undefined;
            return value;
          }));
          this.router.navigate(['klijent/profil']);
        }
        else{
          localStorage.setItem("agencija", JSON.stringify(kIzBaze, function replacer(key, value) {
            if (key === "lozinka" || key === "_id")
              return undefined;
            return value;
          }));
          this.router.navigate(['agencija/profil']);
        }
      }
      else{
        this.poruka='Не постоје подаци за датог корисника'
      }
    })
  }
}
