import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Komentar } from '../models/komentari';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { ObjekatService } from '../objekat.service';
import { PosloviService } from '../poslovi.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-agencija-prikaz',
  templateUrl: './agencija-prikaz.component.html',
  styleUrls: ['./agencija-prikaz.component.css']
})
export class AgencijaPrikazComponent implements OnInit {

  id:string
  komentari:Komentar[]
  agencija:Korisnik
  ulogovan:Korisnik = null
  objekti:Objekat[]

  opis_za_prikaz:string
  skraceni_opis:boolean=true;
  min_datum = new Date().toISOString().split("T")[0];
  pocetak:Date
  brojac:number
  kraj:Date
  objekat:string
  ucitano=0;
  constructor(private route: ActivatedRoute, private router:Router, private korisnik:KorisnikService, private objService:ObjekatService, private posloviService:PosloviService) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    })
  }
  prosiri_opis(){
    console.log("usao")
    this.skraceni_opis =false;
    this.opis_za_prikaz = this.agencija.dodatno['opis']
  }
  break =false;
  ngOnInit(): void {
    if(localStorage.getItem('klijent') || localStorage.getItem('agencija') ){
      this.ulogovan = JSON.parse(localStorage.getItem('klijent')) || JSON.parse(localStorage.getItem('agencija'))
    }
    
    this.korisnik.dohvati_korisnika(this.id).subscribe((ag:Korisnik)=>{
      if(!ag){
        this.router.navigate(['nepostojeca_ruta'])
      }
      try{
        if(this.break) return;
      this.agencija = ag
      this.opis_za_prikaz = this.agencija.dodatno['opis'].substring(0,100);
      if(this.opis_za_prikaz.length==this.agencija.dodatno['opis'].length) this.skraceni_opis = false
      this.ucitano++;
      }catch{
        console.log("aaaaa")
        this.greska = "Не постоји агенција"
        this.ucitano =4
        return;
      }
    })
    if(this.break) return;
    this.korisnik.dohvati_komentare(this.id).subscribe((komentari:Komentar[])=>{
      if(komentari){
        this.komentari = komentari
        console.log(komentari)
      }
      this.ucitano++;
    })
    if(this.ulogovan){
      this.objService.sve_za_korisnika(this.ulogovan.korisnicko_ime).subscribe((res:Objekat[])=>{
        if(res){
          this.objekti = res;
        }
        this.ucitano++;
      })
    }else{
      this.ucitano++
    }
    //agencija.dodatno['opis']
    
    
  }
  uspeh :string
  greska:string
  @ViewChild('modalZatvaranje') modalZatvaranje;
  async posalji_zahtev(){
    const data={
      agencija: this.agencija.korisnicko_ime,
      agencija_ime: this.agencija.dodatno['naziv'],
      klijent: this.ulogovan.korisnicko_ime,
      objekat: this.objekat,
      pocetak: this.pocetak,
      kraj: this.kraj,
      status: "Послат захтев"
    }
    if(!this.kraj || !this.objekat || !this.pocetak || this.pocetak>this.kraj){
      this.greska="Погрешно унети подаци!"
      return;
    }else{
      this.greska = null
    }
    this.posloviService.dodaj_posao(data).subscribe(async (res)=>{
      
      const sleep = async (milliseconds) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });}
      if(res['message']=='ok'){
        this.uspeh = "Успешно послат захтев за сарадњу! Прозор ће се затворити за: "
        this.brojac = 5
        setTimeout(()=>{
          this.uspeh = null
          this.modalZatvaranje.nativeElement.click();
        },5000)
        for (let i = 5; i >0; i--) {
          await sleep(1000);
          this.brojac--;
          
      }
        
      }
    })
  }

}
