import { Token } from '../models/token';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import * as sha512 from 'js-sha512';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private route:ActivatedRoute, private korisnikService: KorisnikService, private router: Router) { }
  greska:string;
  obradjeno:boolean;
  mejl:string;
  stara:string;
  ngOnInit() {

    let k = JSON.parse(localStorage.getItem("klijent")) ||  JSON.parse(localStorage.getItem("agencija"));4
    this.mejl = k.imejl;
    this.korisnikService.sviKorisnici().subscribe((kIzBaze: Korisnik[])=>{
      kIzBaze.forEach((korisnik)=>{
        if(korisnik.korisnicko_ime==k.korisnicko_ime){
          this.stara = korisnik.lozinka
          console.log(this.stara)
        }
      })
    })
  }
  lozinka: string;
  lozinka_opet: string;
  lozinka_7:boolean = true;
  lozinka_12:boolean=true;
  lozinka_vs:boolean=true;
  lozinka_broj:boolean=true;
  lozinka_sk:boolean = true;
  lozinka_pocinje_slovom:boolean = true;
  lozinke_iste:boolean = true;
  lozinka_stara:string;
  lozinka_stara_greska:boolean = false;
  lozinka_ista:boolean=false;

  check_stara(){
    if(!this.lozinka_stara) return;
    let lh = sha512.sha512(this.lozinka_stara);
    if(lh!=this.stara) this.lozinka_stara_greska = true;
    else this.lozinka_stara_greska = false;
  }

  check_pass(){
    if(this.lozinka==null || this.lozinka.length==0) {
      this.lozinka_7 = true;
      this.lozinka_12 = true;
      this.lozinka_vs = true;
      this.lozinka_broj = true;
      this.lozinka_sk = true;
      this.lozinka_pocinje_slovom = true;
      return;
    };
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(this.lozinka.search(/[A-Z]/)<0) this.lozinka_vs = false;
    this.lozinka_vs = true;
    if(this.lozinka.length<7) this.lozinka_7 = false;
    else this.lozinka_7 = true;
    if(this.lozinka.length>12) this.lozinka_12 = false;
    else this.lozinka_12 = true;
    if(!/\d/.test(this.lozinka)) this.lozinka_broj = false;
    else this.lozinka_broj = true;
    if(!format.test(this.lozinka)) this.lozinka_sk = false;
    else this.lozinka_sk = true;
    if(!/[A-Za-z]/.test(this.lozinka.charAt(0))) this.lozinka_pocinje_slovom = false;
    else this.lozinka_pocinje_slovom = true;
    if(!/[A-Z]/.test(this.lozinka)) this.lozinka_vs = false;
    else this.lozinka_vs = true;
    if(this.lozinka_stara == this.lozinka) this.lozinka_ista=true;
    else this.lozinka_ista = false;
    
  }
  check_pass_opet(){
    if(this.lozinka==null) {
      this.lozinka_7 = true;
      this.lozinka_12 = true;
      this.lozinka_vs = true;
      this.lozinka_broj = true;
      this.lozinka_sk = true;
      this.lozinka_pocinje_slovom = true;
      return true;
    };
    if(this.lozinka==this.lozinka_opet) this.lozinke_iste =true;
    else this.lozinke_iste = false;
    return this.lozinke_iste;
  }
  promeni_lozinku(){
    
    this.korisnikService.promeni_lozinku(sha512.sha512(this.lozinka), this.mejl, "-1").subscribe((result : Object)=>{
      let res = JSON.stringify(result)
      result = JSON.parse(res);
      if(result['message']=="updated") {
        localStorage.removeItem("klijent");
        localStorage.removeItem("agencija");
        this.router.navigate(['prijava'])
      }
      else this.greska="Дошло је до грешке. Освежите страницу и пробајте опет."
    })
  }

}
