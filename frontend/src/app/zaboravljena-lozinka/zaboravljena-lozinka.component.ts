import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';


@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.sviKorisnici().subscribe((kIzBaze: Korisnik[])=>{
      this.korisnici = kIzBaze;
    })
  }
  mejl: string;
  korisnici: Korisnik[];
  mejl_greska : boolean = false;
  mejl_postoji : boolean = true;
  mejl_potvrda : string;
  mejl_razlicit : boolean =false;
  poslato:boolean = false;
  poruka: string;
  mejl_isti(){
    if(this.mejl!=this.mejl_potvrda) this.mejl_razlicit = true;
    else this.mejl_razlicit = false;
  }
  postoji_mejl(){
    let set_in_iter_mejl = false;
    if(!this.mejl){
      this.mejl_postoji=true;
      this.mejl_greska=false;
    }else if(this.mejl=="" || this.mejl==" "){
      this.mejl_postoji=true;
      this.mejl_greska=false;
    }else{
    this.korisnici.forEach((korisnik)=>{
      if(korisnik.imejl==this.mejl){
        this.mejl_postoji= true;
        set_in_iter_mejl = true;
      }
      else if(!set_in_iter_mejl)  this.mejl_postoji  = false;
    })
    }
  }
  format_mejl(){
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl);
    if(!res) this.mejl_greska=true;
    else this.mejl_greska=false;
    return res;
  }


  posalji(){
    this.korisnikService.reset_lozinke(this.mejl).subscribe((resp)=>{
      this.poslato = true;
    })
    
  }

}
