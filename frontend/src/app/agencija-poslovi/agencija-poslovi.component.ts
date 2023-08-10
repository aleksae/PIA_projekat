import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PosloviService } from '../poslovi.service';
import { Korisnik } from '../models/korisnik';
import { Posao } from '../models/posao';
import { Objekat } from '../models/objekat';
import { ObjekatService } from '../objekat.service';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { Radnik } from '../models/radnik';
import { RadniciService } from '../radnici.service';

@Component({
  selector: 'app-agencija-poslovi',
  templateUrl: './agencija-poslovi.component.html',
  styleUrls: ['./agencija-poslovi.component.css']
})
export class AgencijaPosloviComponent implements OnInit {

  constructor(private posloviService:PosloviService, private objServise:ObjekatService, private radniciService:RadniciService) { }

  ulogovan:Korisnik = null
  poslovi:Posao[] = []
  poslovi_zahtev:Posao[] = []
  poslovi_aktivni:Posao[] = []
  @ViewChild('gasenje') gasenje;
  brojac:number
  uspeh:string
  greska:string
  objekti:Array<Object> = []
  broj_slobodnih_radnika:number=0;
  @ViewChild('skica_objekta') canvas: ElementRef;
  
  kontekst: CanvasRenderingContext2D;
  
  tekuci_objekat:Objekat
  prostorije: Array<Prostorija>  =[]
  vrata: Array<Vrata> = []
  dodeljeni_radnici:Array<Object> = []
  radnici:Radnik[] = []
  pregledaj_posao:boolean = false
  ngOnInit(): void {
    this.poslovi = []
    this.poslovi_zahtev = []
    this.poslovi_aktivni = []
    this.radnici = []
    this.selektovane_crvene = []
    this.selektovane_zelene = []
    this.broj_slobodnih_radnika =0
    this.ulogovan = JSON.parse(localStorage.getItem("agencija"));
    
    this.posloviService.dohvati_sve_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res:Posao[])=>{
      if(res){
        this.poslovi = res
        let i =0;
        for(let p of this.poslovi){
          this.objServise.dohvati_objekat(p.objekat).subscribe((res:Objekat)=>{
            if(res) {
              let obj={}
              obj[p._id] = res[0]
              this.objekti.push(obj)
            }
            if(i==(this.poslovi.length-1)){
              this.kontekst = this.canvas.nativeElement.getContext('2d')
            }
            i++
          })
          if(p.status=="Послат захтев") this.poslovi_zahtev.push(p)
          if(p.status=="Активан") this.poslovi_aktivni.push(p)
          
          
        }
        this.radniciService.dohvati_sve_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res:Radnik[])=>{
          for(let r of res){
            if(!r.angazovan) {
              this.radnici.push(r)
              this.broj_slobodnih_radnika++
            }
          }
        })
      }
    })
  }
  selektovan_posao:number;
  dohvati_obj(){
    for(let o of this.objekti){
      if(o[this.poslovi_zahtev[this.selektovan_posao]._id]) return o[this.poslovi_zahtev[this.selektovan_posao]._id]
    }
    return null
  }
  dohvati_obj_akt(){
    for(let o of this.objekti){
      if(o[this.poslovi_aktivni[this.selektovan_posao]._id]) return o[this.poslovi_aktivni[this.selektovan_posao]._id]
    }
    return null
  }
  pregled_akt(i:number){
    this.pregledaj_posao = false
    this.selektovan_posao = i
    this.prostorije = []
    this.vrata = []
    this.kontekst = this.canvas.nativeElement.getContext('2d')
    this.tekuci_objekat = this.dohvati_obj_akt()
    
    for(let j=0; j<this.tekuci_objekat.prostorije.length; j++){
      this.prostorije.push(this.tekuci_objekat.prostorije[j])
      for(let k=0; k<this.tekuci_objekat.prostorije[j].vrata.length; k++)
        this.vrata.push(this.tekuci_objekat.prostorije[j].vrata[k])
    }
    this.iscrtaj()

  }
  pregled(i:number){
    this.pregledaj_posao = true
    this.selektovan_posao = i
    this.prostorije = []
    this.vrata = []
    this.kontekst = this.canvas.nativeElement.getContext('2d')
    this.tekuci_objekat = this.dohvati_obj()
    
    for(let j=0; j<this.tekuci_objekat.prostorije.length; j++){
      this.prostorije.push(this.tekuci_objekat.prostorije[j])
      for(let k=0; k<this.tekuci_objekat.prostorije[j].vrata.length; k++)
        this.vrata.push(this.tekuci_objekat.prostorije[j].vrata[k])
    }
    this.iscrtaj()

  }
 
  selektovana_prostorija:number;
  odabrani:string[] = []
  selektovane_crvene = []
  selektovane_zelene = []
  selektuj(event){
    if(this.poslovi_aktivni[this.selektovan_posao]['placen']){
      this.greska = "Не можете уређивати плаћен посао!"
      return;
    } 
    let res = this.proveri_da_li_obuhavata(event.offsetX, event.offsetY)
    if(res>-1){
      for(let i=0; i<this.selektovane_crvene.length; i++){
        if(res==this.selektovane_crvene[i]){
          this.tekuci_objekat.prostorije[res].boja_popuna = 'red'
          this.selektovane_crvene.splice(i,1)
          i--
          this.iscrtaj()
          this.ima_neka()
          return;
        }
      }
      
    
      if(this.tekuci_objekat.prostorije[res].boja_popuna=='red'){
        this.tekuci_objekat.prostorije[res].boja_popuna='green'
        this.selektovane_crvene.push(res)
        this.iscrtaj()
        this.ima_neka()
        return;
      }
      /*zeleno u zuto*/
      for(let i=0; i<this.selektovane_zelene.length; i++){
        if(res==this.selektovane_zelene[i]){
          this.tekuci_objekat.prostorije[res].boja_popuna = 'green'
          this.selektovane_zelene.splice(i,1)
          i--
          this.iscrtaj()
          this.ima_neka()
          return;
        }
      }
      if(this.tekuci_objekat.prostorije[res].boja_popuna=='green' && this.broj_slobodnih_radnika){
        this.tekuci_objekat.prostorije[res].boja_popuna='yellow'
        
        console.log("usao ovde")
        this.selektovane_zelene.push(res)
        this.selektovana_prostorija = res
        this.iscrtaj()
        this.ima_neka()
        console.log(this.tekuci_objekat.prostorije)
        return;
      }
      /******* */
      
      this.selektovana_prostorija = res
      
    }
  } 
  ima_neka_crvena = false;
  ima_neka_zuta = false
  ima_neka(){
    
    for(let i=0; i<this.tekuci_objekat.prostorije.length; i++){
      if(this.tekuci_objekat.prostorije[i].boja_popuna=='red') this.ima_neka_crvena = true
      if(this.tekuci_objekat.prostorije[i].boja_popuna=='yellow') this.ima_neka_zuta = true
    }

  }
  izbor_radnika(){
    if(this.selektovana_prostorija<0) return;
    let i=0;
    for(let d of this.dodeljeni_radnici){
      if(d[this.selektovana_prostorija]) this.dodeljeni_radnici.splice(i,1)
      i++;
    }
    for(let k of this.odabrani){
      let obj = {}
      obj[this.selektovana_prostorija] = k
      this.dodeljeni_radnici.push(obj)
    }
  }
  kruzno(boja:string){
    if(boja=='yellow') return 'red'
    else if(boja=='red') return 'green'
    else return 'yellow'
  }
  zuto_u_crveno (){

    let no_per_room = []
    for(let i=0; i<this.prostorije.length; i++){
      no_per_room.push(0)
    }
    let max = no_per_room.length
    for(let d of this.dodeljeni_radnici){
      for(let i=0; i<this.prostorije.length; i++){
        if(d[i]) no_per_room[i]++;
      }
    }
    for(let i=0; i<max; i++){
      if(no_per_room[i]==0 && this.tekuci_objekat.prostorije[i].boja_popuna=='yellow'){
        console.log("ima greska")
        this.greska = "Свака соба мора имати бар једног радника"
        return -1;
      }
      else{
        console.log(no_per_room)
        console.log(this.tekuci_objekat.prostorije[i].boja_popuna)
        this.greska = null
      }
      //azuriraj radnike
      let brojac=0;
      let max_okr = this.dodeljeni_radnici.length
      for(let d of this.dodeljeni_radnici){
        for(let i=0; i<this.prostorije.length; i++){
          if(d[i] && this.tekuci_objekat.prostorije[i].boja_popuna=='yellow') {
            if(this.tekuci_objekat.prostorije[i].boja_popuna=='yellow')this.tekuci_objekat.prostorije[i].boja_popuna = "red"
      
              this.objServise.azuriraj(this.tekuci_objekat).subscribe((res)=>{
              })
            for(let k=0; k<this.radnici.length; k++){
              if(d[i]==this.radnici[k]._id) {
                //console.log("usao za radnika")
                //console.log(this.radnici[k])
                this.radnici[k].angazovan = this.poslovi_aktivni[this.selektovan_posao]._id
                this.radnici[k].prostorija = i
                //console.log(this.radnici[k])
                this.radniciService.azuriraj_radnika(this.radnici[k]).subscribe((res)=>{
                  
                    
                  
                })
              }
            }
          }
        }
        brojac++
      }
      //azuriraj objekat
      

    }
    
    
    return 0

  }
  crveno_u_zeleno(){
    this.objServise.azuriraj(this.tekuci_objekat).subscribe((res)=>{
      if(res) {
       
      }else{
        console.log("err obj")
      }
    })
    let k = this.selektovane_crvene.length
    for(let i=0; i<k;i++){
      this.radniciService.oslobodi_radnika_posao_prostorija(this.poslovi_aktivni[this.selektovan_posao]._id,this.selektovane_crvene[i]).subscribe((res)=>{
        if((k-1) == i)  {
         
          window.location.reload();
        }else{
          console.log("els "+i+" a " +this.selektovane_crvene.length)
        }
      })
    }
    
    this.gasenje.nativeElement.click()
    

  }
 
  sacuvaj(){
    let usao_pre=false
    this.ima_neka()
    if(this.ima_neka_zuta || this.selektovane_zelene.length) {
      usao_pre = true
      console.log("usao")
      if(this.zuto_u_crveno()<0) {
        console.log("greskaaa")
        return;
      }
    }
    if((this.ima_neka_crvena || this.selektovane_crvene.length) && !usao_pre){
     console.log(this.selektovane_crvene.length)
      this.crveno_u_zeleno();
    }
    setTimeout(()=>{
      window.location.reload();
    },600)
    this.selektovane_crvene = []
    this.selektovane_zelene = []

    //this.tekuci_objekat=null

    
  }
  proveri_da_li_je_odabran(id){
    for(let d of this.dodeljeni_radnici){
      if(d[this.selektovana_prostorija]==id) return true;
    }
    return false;
  }
  proveri_da_li_je_odabran_uopsteno(id){
    for(let d of this.dodeljeni_radnici){
      for(let i=0; i<this.prostorije.length; i++)
        if(d[i]==id && i!=this.selektovana_prostorija) return true;
    }
    return false;
  }

  proveri_da_li_obuhavata(x1, y1){
    let i=0;
    for(let p of this.prostorije){
      let x = p.pozicija_x
      let y = p.pozicija_y
      let s = x+p.sirina
      let v = y+p.visina

      
      if(p.postavljeno){
        if(x1>x && x1<s && y1>y && y1<v) return i;
      }
      i++;
    }
    return -1;
  }
  
  iscrtaj(){

   
      this.kontekst.clearRect(0,0,600,350) 
      let j=0;
          for(let m=0; m<this.prostorije.length;m++){
           let p = this.prostorije[m];
            if(p['postavljeno']){
              this.kontekst.fillStyle = p.boja_popuna;
              this.kontekst.strokeStyle = p.boja_okvir;
              this.kontekst.fillRect(p['pozicija_x'],p['pozicija_y'],p['sirina'],p['visina'])
              this.kontekst.strokeRect(p['pozicija_x'],p['pozicija_y'],p['sirina'],p['visina'])
              this.kontekst.font="20px Georgia";
              this.kontekst.textAlign="center"; 
              this.kontekst.textBaseline = "middle";
              this.kontekst.fillStyle = "#000000";
              this.kontekst.fillText((j+1)+"",p['pozicija_x']+(p['sirina']/2),p['pozicija_y']+(p['visina']/2));
            }else{
            }
            j++;
          }
          for(let k=0; k<this.vrata.length; k++){
         
                this.iscrtaj_svg(-1, k)
           
          }
    
  }
  iscrtaj_svg(j, i){
    //console.log("j je "+j+" a i je "+i)
    //let old_s = this.objekti[j].sirina_kanvasa
    this.kontekst.save()
    this.kontekst.fillStyle=this.vrata[i].boja
              this.kontekst.beginPath()
              let p = new Path2D("M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z");
              this.kontekst.translate(this.vrata[i].pozicija_x+(this.vrata[i].strana == 1 || this.vrata[i].strana==4 ? 16 : ( this.vrata[i].strana == 3 ? -16 : 0)),this.vrata[i].pozicija_y-(this.vrata[i].strana == 3 || this.vrata[i].strana == 4? -16 : 16))
              let ugao = 0;
              switch(this.vrata[i].strana){
                case 1:
                  ugao = 90 * Math.PI / 180 
                  break;
                case 2:
                  ugao = 0
                  break;
                case 3:
                  ugao = -90 * Math.PI / 180 
                  break;
                case 4:
                  ugao = 180 * Math.PI / 180 
                  break;
              }
              this.kontekst.rotate(ugao)
              
              this.kontekst.fill(p);
              /*if(old_s==600 && this.canvasi.get(j).nativeElement.width == 400 || old_s==400 && this.canvasi.get(j).nativeElement.width==285){
                console.log("skalirano")
                this.konteksti[j].scale(0.6667,0.7142)
              }else if(old_s==600 && this.canvasi.get(j).nativeElement.width ==285){
                this.konteksti[j].scale(0.6667*0.6667,0.7142*0.7142)
              }else if(old_s==400 && this.canvasi.get(j).nativeElement.width == 600 || old_s==285 && this.canvasi.get(j).nativeElement.width==400){
                this.konteksti[j].scale(1.5,1.4)
              }else{
                this.konteksti[j].scale(2.2497,1.96)
              }*/
              
           
              this.kontekst.closePath()
              this.kontekst.restore()
  }
  otkazi_unos(event){
    
    for(let i =0; i<this.selektovane_crvene.length; i++){
      this.tekuci_objekat.prostorije[this.selektovane_crvene[i]].boja_popuna = 'red';
    }
    for(let i =0; i<this.selektovane_zelene.length; i++){
      this.tekuci_objekat.prostorije[this.selektovane_zelene[i]].boja_popuna = 'green';
    }
    this.tekuci_objekat = null
    this.pregledaj_posao = !this.pregledaj_posao
    
  }
  ponuda:number
  prihvati_zahtev(){
    if(!this.ponuda) {
      this.greska = "Понуда је обавезно поље!"
      return;
    }
    let z=this.poslovi_zahtev[this.selektovan_posao]
    z.status='Понуда послата'
    z.ponuda = this.ponuda
    this.posloviService.azuriraj(z).subscribe((res)=>{
      if(res) {
        this.ngOnInit()
        this.gasenje.nativeElement.click();
        
      }
      else console.log("err")
    })
  }
  odbij_zahtev(){
    let z=this.poslovi_zahtev[this.selektovan_posao]
    z.status='Одбијен'
    this.posloviService.azuriraj(z).subscribe((res)=>{
      if(res) {
        this.ngOnInit()
        this.gasenje.nativeElement.click();
      }
      else console.log("err")
    })

  }

}
