import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private kServ:KorisnikService) { }

  korisnici:Korisnik[] = []
  ngOnInit(): void {
    this.korisnici = []
    this.kServ.sviKorisnici().subscribe((res:Korisnik[])=>{
      if(res){
        for(let l of res){
          if(!l['odobren'] && !l['odbijen']) this.korisnici.push(l)
        }
      }
    })
  }
  obradi(i, k:Korisnik){
    if(i>0){
      k.odobren=true;
      this.kServ.odobrenost(k).subscribe((res)=>{
        if(res) this.ngOnInit()
      })
    }else{
        k.odobren=false;
        k.odbijen=true
 
        this.kServ.odobrenost(k).subscribe((res)=>{
          if(res) this.ngOnInit()
        })
    }
  }

}
