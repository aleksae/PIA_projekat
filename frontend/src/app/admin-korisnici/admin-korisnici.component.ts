import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './admin-korisnici.component.html',
  styleUrls: ['./admin-korisnici.component.css']
})
export class AdminKorisniciComponent implements OnInit {

  constructor(private kServ:KorisnikService, private router:Router) { }

  korisnici:Korisnik[] = []
  ngOnInit(): void {
    this.korisnici = []
    this.kServ.sviKorisnici().subscribe((res:Korisnik[])=>{
      if(res){
        for(let r of res){
          if(r.odobren) this.korisnici.push(r)
        }
      }
    })
  }
  obrisi(k:Korisnik){
    this.kServ.obrisi_korisnika(k.korisnicko_ime).subscribe((res)=>{
      if(res){
        this.ngOnInit()
      }
    })
  }

}
