import { Component, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { RadniciService } from '../radnici.service';
import { Radnik } from '../models/radnik';
import { ZahtevRadnaMesta } from '../models/zahtev_radna_mesta';

@Component({
  selector: 'app-agencija-radnici',
  templateUrl: './agencija-radnici.component.html',
  styleUrls: ['./agencija-radnici.component.css']
})
export class AgencijaRadniciComponent implements OnInit {

  constructor(private servis:RadniciService) { }

  ulogovan:Korisnik
  radnici:Radnik[] = []
  slobodni:number=0
  br_radnika:number = 0;
  br_radnih_mesta_odobreno:number=0;
  br_radnih_mesta_na_cekanju:number=0;
  ime:string;
  prezime:string;
  mejl:string;
  telefon:number = null;
  specijalizacija:string;
  azurira_se:Radnik;
  ngOnInit(): void {
    this.slobodni = 0
    this.br_radnika = 0
    this.br_radnih_mesta_na_cekanju = 0
    this.br_radnih_mesta_odobreno = 0
    this.radnici = []
    this.ulogovan = JSON.parse(localStorage.getItem("agencija"))
    this.servis.dohvati_sve_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res:Radnik[])=>{
      if(res.length){
        this.radnici = res
        this.br_radnika = this.radnici.length
        for(let r of this.radnici){
          if(!r.angazovan) this.slobodni++
        }
      }
    })
    this.servis.dohvati_zahteve_za_radna_mesta_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res:ZahtevRadnaMesta[])=>{
      if(res.length){
        for(let r of res){
          if(r.status=='odobreno') this.br_radnih_mesta_odobreno+=r.broj_mesta
          else if(r.status=='poslato') this.br_radnih_mesta_na_cekanju+=r.broj_mesta
        }
      }
      
    })
  }
  br_mesta_uneto:number;
  uspeh:string 
  greska:string 
  mejl_format_greska:boolean=false
  @ViewChild('dodaj_radnika') modal_dodaj_radnika;
  brojac:number;
  telefon_validan:boolean = true
  brisanje(id){
    console.log(id)
    this.servis.obrisi_radnika(id).subscribe((res)=>{
      if(res){
        this.ngOnInit()
        console.log("success")
        console.log(res)
      }else{
        console.log(res)
      }
    })
  }
  uredi_radnika_izbor(r:Radnik){
    this.azurira_se = r
    this.ime = r.ime
    this.prezime = r.prezime
    this.mejl = r.imejl
    this.telefon = r.telefon
    this.specijalizacija = r.specijalizacija
  }
  otkazi_unos(){
    this.azurira_se = null
    this.ime = ""
    this.prezime = ""
    this.mejl = ""
    this.telefon = null
    this.specijalizacija = ""
  }
  check(){
    this.format_mejl()
  }
  format_mejl(){
    this.mejl_format_greska =  !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl));
  }
  telefon_provera(){
    if(this.telefon.toString().length>5) this.telefon_validan = true;
    else this.telefon_validan = false
  }
  dodaj_novog_radnika(){
    if(!this.ime || !this.prezime || !this.telefon_validan || this.mejl_format_greska){
      this.greska = "Грешка са подацима"
      return;
    }else{
      this.greska = null
    }
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
          return setTimeout(resolve, milliseconds)
      });}
    const data={
      _id: this.azurira_se ? this.azurira_se._id :null,
      ime: this.ime,
      prezime: this.prezime,
      telefon: this.telefon,
      imejl: this.mejl,
      specijalizacija:this.specijalizacija,
      agencija:this.ulogovan.korisnicko_ime,
      angazovan: this.azurira_se ? this.azurira_se.angazovan : '',
      prostorija: this.azurira_se ? this.azurira_se.prostorija : -1
    }
    console.log(data)
    if(this.azurira_se){
      this.servis.azuriraj_radnika(data).subscribe(async(res)=>{
        if(res['message']=='ok'){
          this.uspeh = "Радник успешно ажуриран!"
          this.brojac = 5
          this.ngOnInit()
          setTimeout(()=>{
            this.uspeh = null
            this.modal_dodaj_radnika.nativeElement.click();
            this.azurira_se=null
            
          },5000)
          
          for (let i = 5; i >0; i--) {
            await sleep(1000);
            this.brojac--;
            
          }
        }
      })
    }else{
    this.servis.dodaj_radnika(data).subscribe(async (res)=>{
      if(res['message']=='ok'){
        this.uspeh = "Радник успешно додат!"
        this.brojac = 5
        this.ngOnInit()
        setTimeout(()=>{
          this.uspeh = null
          this.modal_dodaj_radnika.nativeElement.click();
          
        },5000)
        
        for (let i = 5; i >0; i--) {
          await sleep(1000);
          this.brojac--;
          
        }
      }

    })
  }
  }
  posalji_zahtev_za_radna(){
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
          return setTimeout(resolve, milliseconds)
      });}
    if(!this.br_mesta_uneto || this.br_mesta_uneto==0) return;
    this.servis.dodaj_zahtev_za_radna_mesta(this.ulogovan.korisnicko_ime, this.br_mesta_uneto).subscribe(async (res)=>{
      if(res){
        this.br_radnih_mesta_na_cekanju += this.br_mesta_uneto
        
        this.uspeh = "Успешно послат захтев за радна места, количина "+this.br_mesta_uneto+". Прозор ће се затворити за: "
        this.br_mesta_uneto = null
        this.brojac = 5
        setTimeout(()=>{
          this.uspeh = null
          this.modal_dodaj_radnika.nativeElement.click();
        },5000)
        for (let i = 5; i >0; i--) {
          await sleep(1000);
          this.brojac--;
          
        }
      }
    }
    )
  }
  


}
