import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-agencije-pregled',
  templateUrl: './agencije-pregled.component.html',
  styleUrls: ['./agencije-pregled.component.css'],
}) 
export class AgencijePregledComponent implements OnInit {

  constructor(private korisnikService: KorisnikService) { }

  korisnici:Korisnik[];
  stanje: string;
  adresa: string;
  stara_adresa: string;
  naziv: string;
  stari_naziv: string;
  pocetno:Korisnik[];
  pretraga_u_toku:boolean = false;
  sort_naziv_rastuce:boolean=false;
  sort_naziv_opadajuce:boolean=false;
  sort_adresa_rastuce:boolean=false;
  sort_adresa_opadajuce:boolean=false;
  ucitavanje: boolean=false;
  opisi:Object[] = []
  opisi_indikator:Object[] = []
  ngOnInit(): void {
    this.opisi = []
    this.opisi_indikator = []
    this.ucitavanje = true
    this.pretraga_u_toku = false;
    this.korisnici = []
    this.stanje = "Све агенције";
    this.korisnikService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
    this.pocetno = korisnici;
    korisnici.forEach((korisnik)=>{
      if(korisnik.uloga == "agencija") {
        this.korisnici.push(korisnik);
        let obj = {}
        obj[korisnik.korisnicko_ime] = korisnik.dodatno['opis'].substring(0,100)
        this.opisi.push(obj)
        obj = { }
        obj[korisnik.korisnicko_ime] = (korisnik.dodatno['opis'].length<=100) ? true : false
        this.opisi_indikator.push(obj)
      }
     })
     this.pocetno = this.korisnici;
     this.ucitavanje = false;
    })
    
  }
  dohvati_opis(k:Korisnik){
    for(let o of this.opisi)
      if(o[k.korisnicko_ime]) return o[k.korisnicko_ime]
  }
  dohvati_indikator_opisa(k:Korisnik){
    for(let o of this.opisi_indikator)
      if(o[k.korisnicko_ime]) return o[k.korisnicko_ime]
  }
  azuriraj_prikaz_opisa(k:Korisnik){
    let i=0
    for(let o of this.opisi_indikator){
      if(o[k.korisnicko_ime])  {
        o[k.korisnicko_ime] = !o[k.korisnicko_ime]   
          if(this.opisi[i][k.korisnicko_ime]){
            if(o[k.korisnicko_ime]) this.opisi[i][k.korisnicko_ime] = this.korisnici[i].dodatno['opis']
            else this.opisi[i][k.korisnicko_ime]= this.korisnici[i].dodatno['opis'].substring(0,100)
          }  
      }
      i++
    }
  
  }
  sortiraj(res: string){
    switch(res) {
      case 'a_o':
        this.sort_adresa_opadajuce = !this.sort_adresa_opadajuce
        if(this.sort_adresa_opadajuce && this.sort_adresa_rastuce) this.sort_adresa_rastuce = false;
        break;
      case 'a_r':
        this.sort_adresa_rastuce = !this.sort_adresa_rastuce
        if(this.sort_adresa_opadajuce && this.sort_adresa_rastuce) this.sort_adresa_opadajuce = false;
        break;
      case 'n_o':
        this.sort_naziv_opadajuce = !this.sort_naziv_opadajuce
        if(this.sort_naziv_opadajuce && this.sort_naziv_rastuce) this.sort_naziv_rastuce = false;
        break;
      case 'n_r':
        this.sort_naziv_rastuce = !this.sort_naziv_rastuce
        if(this.sort_naziv_opadajuce && this.sort_naziv_rastuce) this.sort_naziv_opadajuce = false;
        break;
      default:
    }
    //console.log("sno "+this.sort_naziv_opadajuce+" snr "+this.sort_naziv_rastuce+" sao "+this.sort_adresa_opadajuce+" sar "+this.sort_adresa_rastuce)
    if(this.sort_adresa_opadajuce){
      if(this.sort_naziv_opadajuce) this.korisnici.sort((a,b)=> ((this.sort_string(b['dodatno']['adresa'],a['dodatno']['adresa'])) || (this.sort_string(b['dodatno']['naziv'],a['dodatno']['naziv']))));
      else if(this.sort_naziv_rastuce) this.korisnici.sort((a,b)=> ((this.sort_string(b['dodatno']['adresa'],a['dodatno']['adresa'])) || (this.sort_string(a['dodatno']['naziv'], b['dodatno']['naziv']))));
      else this.korisnici.sort((a,b)=> this.sort_string(b['dodatno']['adresa'],a['dodatno']['adresa']))
    }
    else if(this.sort_adresa_rastuce){
      if(this.sort_naziv_opadajuce) this.korisnici.sort((a,b)=> ((this.sort_string(a['dodatno']['adresa'],b['dodatno']['adresa'])) || (this.sort_string(b['dodatno']['naziv'],a['dodatno']['naziv']))));
      else if(this.sort_naziv_rastuce) this.korisnici.sort((a,b)=> ((this.sort_string(a['dodatno']['adresa'],b['dodatno']['adresa'])) || (this.sort_string(a['dodatno']['naziv'], b['dodatno']['naziv']))));
      else this.korisnici.sort((a,b)=> this.sort_string(a['dodatno']['adresa'],b['dodatno']['adresa']))
    }
    else if(this.sort_naziv_opadajuce){
      this.korisnici.sort((a,b)=> this.sort_string(b['dodatno']['naziv'],a['dodatno']['naziv']))
    }
    else if(this.sort_naziv_rastuce){
      this.korisnici.sort((a,b)=> this.sort_string(a['dodatno']['naziv'],b['dodatno']['naziv']))
    }else{
      this.korisnici.sort((a,b)=> {
        
        if(this.pocetno.indexOf(a)>this.pocetno.indexOf(b)) return 1;
        else if(this.pocetno.indexOf(a)<this.pocetno.indexOf(b)) return -1;
        else return 0;
      })
    }

  }

  sort_string(a,b){
    if(a>b) return 1;
    else if(a<b) return -1;
    else return 0;
  }
  private pretrazi_po_adresi(){
    this.pocetno.forEach((agencija)=>{
      if(!(agencija.uloga=="agencija")) return;
      if((agencija.dodatno["adresa"]).toLowerCase().match(this.adresa.toLowerCase())==this.adresa.toLowerCase()) this.korisnici.push(agencija)
    })
    this.stanje="Резултати претраге"
  }
  private pretrazi_po_nazivu(){
    this.pocetno.forEach((agencija)=>{
      if(!(agencija.uloga=="agencija")) return;
      if(agencija.dodatno["naziv"].toLowerCase().match(this.naziv.toLowerCase())==this.naziv.toLowerCase()) this.korisnici.push(agencija)
    })
    this.stanje="Резултати претраге"
  }
  private pretrazi_po_oba(){
    this.korisnici=[];
    this.pocetno.forEach((agencija)=>{
      if(!(agencija.uloga=="agencija")) return;
      if(agencija.dodatno["naziv"].toLowerCase().match(this.naziv.toLowerCase())==this.naziv.toLowerCase()
      && (agencija.dodatno["adresa"]).toLowerCase().match(this.adresa.toLowerCase())==this.adresa.toLowerCase()) this.korisnici.push(agencija)
    })
    this.stanje="Резултати претраге"
  }


  reset_adresa(){
    this.adresa = null;
    this.pretraga();
  }
  reset_naziv(){
    this.naziv = null;
    this.pretraga();
  }
  
  async pretraga(){
    this.stara_adresa = this.adresa;
    this.stari_naziv = this.naziv;
    this.pretraga_u_toku= true;
    this.korisnici = [];
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    if(!this.naziv || this.naziv == ''){
      //nije unet naziv agencije
      if(!this.adresa || this.adresa==''){
        //nije uneta ni adresa ni agencija
        this.ngOnInit()
        this.stanje="Сви корисници"
      }else{
        this.pretrazi_po_adresi();
      }
    }else{
      //unet je naziv agencije
      
      this.pretrazi_po_nazivu();
      if(!this.adresa || this.adresa==''){
        //nije uneta adresa, ali jeste naziv, ne radimo nista
      }else{
        //uneta i adresa i naziv agencije
        this.pretrazi_po_oba();
      }
    }
    this.sortiraj(null);
    this.pretraga_u_toku= false;
  }
  

}
