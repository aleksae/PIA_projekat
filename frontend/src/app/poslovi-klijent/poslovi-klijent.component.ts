import { Component, ElementRef, OnInit, QueryList, ViewChildren, HostListener,ChangeDetectorRef } from '@angular/core';
import { Objekat } from '../models/objekat';
import { Korisnik } from '../models/korisnik';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { Posao } from '../models/posao';
import { PosloviService } from '../poslovi.service';
import { ObjekatService } from '../objekat.service';
import { Zahtev } from '../models/zahtev';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Komentar } from '../models/komentari';

@Component({
  selector: 'app-poslovi-klijent',
  templateUrl: './poslovi-klijent.component.html',
  styleUrls: ['./poslovi-klijent.component.css']
})
export class PosloviKlijentComponent implements OnInit {

  constructor(private posloviService:PosloviService, private korisnikServis:KorisnikService, private objService:ObjekatService, private cdRef:ChangeDetectorRef, private router:Router) { }

  @ViewChildren('skica_objekta') private canvasi: QueryList<ElementRef>;
  
  objekti : Object = {}
  ulogovan : Korisnik = JSON.parse(localStorage.getItem('klijent'))
  prozor_s:number=null;
  prozor_v:number=null;
  setovan=false;
  
  prostorije: Array<Prostorija[]>  =[]
  vrata: Array<Vrata[]> = []
  konteksti: CanvasRenderingContext2D[]=[];
  old_s:number
  poslovi:Posao[]=[]
  br_kred_kartice:string = "";
  zahtevi_za_otkazivanjem:object[] = []
  zahtevi_za_otkazivanjem_detalji:object[] = []
  gotovo:boolean=false
  aktivni_filter:boolean =false;
  zavrseni_filter:boolean = false;
  zahtevi_filter:boolean = false;
  poslovi_original:Posao[] = []
  sve_zelene:object[] = []
  br_obj:number = 0
  sve_zelene_check(id){
    for(let z of this.sve_zelene){
      if(z[id]) return true;
    }
    return false;
  }
  komentari:Object = {}
  ocene:Object={}
  komentari_uneti:Object={}
  greska:string
  posalji_komentar(p:Posao){
    
    if(!this.komentari_uneti[p._id] || !this.ocene[p._id] || this.ocene[p._id]<1 || this.ocene[p._id]>5){
      this.greska = "Унети подаци нису исправни"!
      return;
    }
    const data={
      id: (this.komentari[p._id]) ? this.komentari[p._id]['_id'] : '',
      agencija:p.agencija,
      klijent:this.ulogovan.korisnicko_ime,
      ocena:this.ocene[p._id],
      komentar:this.komentari_uneti[p._id],
      posao:p._id
    }
    if(this.komentari[p._id]){
      this.korisnikServis.uredi_komentar(data).subscribe((res)=>{
        if(res['message']=='ok'){
          window.location.reload()
        }
      })
    }else{
      this.korisnikServis.dodaj_komentar(data).subscribe((res)=>{
        if(res['message']=='ok'){
          window.location.reload()
        }
      })
    }
  }
  obrisi_komentar(p:Posao){
    const data={
      _id:this.komentari[p._id]._id
    }
    this.korisnikServis.obrisi_komentar(data).subscribe((res)=>{
      if(res['message']=='ok'){
        window.location.reload()
      }
    })
  } 
  ocena:number
  komentar:string
  ngOnInit(): void {
    this.br_obj = 0
    this.objekti = {}
    this.komentari = []
    this.korisnikServis.dohvati_komentare_klijent(this.ulogovan.korisnicko_ime).subscribe((res:Komentar[])=>{
      if(res){
        for(let r of res){
          this.komentari[r.posao] = r
          this.ocene[r.posao] = r.ocena
          this.komentari_uneti[r.posao] = r.komentar
        }
        console.log(this.komentari)
       
      }
    })
    
    this.posloviService.dohvati_sve_za_klijenta(this.ulogovan.korisnicko_ime).subscribe((res:Posao[])=>{
      this.poslovi = res
      this.poslovi_original = res
      if(this.poslovi.length==0){
        this.gotovo=true
        this.setovan=true;
        return;
        
      }
      for(let i =0; i<this.poslovi.length; i++){
        this.objService.dohvati_objekat(this.poslovi[i].objekat).subscribe((res:Objekat)=>{
          if(res) {
            this.objekti[this.poslovi[i]._id] = res
            this.br_obj++
            let cnt=0;
            for(let i=0; i<res[0].prostorije.length; i++){
              if(res[0].prostorije[i].boja_popuna=='green') cnt++
            }
            console.log("posao "+i+" "+cnt)
            let obj={}
            if(cnt==res[0].broj_prostorija){
              obj[this.poslovi[i]._id] = true
            }else obj[this.poslovi[i]._id] = false
            this.sve_zelene.push(obj)

          }
          this.posloviService.dohvati_zahtev_za_otkazivanjem(this.poslovi[i]._id).subscribe((res:Zahtev[])=>{
            let prom = this.poslovi[i]._id
            if(res.length) {
              let obj1= {}
              obj1[prom] = true
              let obj2 = {}
              obj2[prom] = res[0]
              this.zahtevi_za_otkazivanjem.push(obj1)
              this.zahtevi_za_otkazivanjem_detalji.push(obj2)
              //console.log(this.zahtevi_za_otkazivanjem)
            }
            else this.zahtevi_za_otkazivanjem.push({prom:false})
            //console.log(res)
            if((this.poslovi.length-1)==i){
              //console.log(this.zahtevi_za_otkazivanjem)
              this.inicijalizuj()
              //console.log("aleksa")
              this.gotovo=true
              this.setovan=true;
             
              setTimeout(()=>{
                this.ngAfterViewInit()}, 0
              )
            }
          })
        })
        
      }
      
      
      

    })
  }
  
  plati(p:Posao){
    p.placen = true;
    p.status = "Завршен"
    this.posloviService.azuriraj(p).subscribe((res)=>{
      if(res) {
        this.objService.dohvati_objekat(p.objekat).subscribe((ress:Objekat)=>{
          if(ress){

            for(let i=0; i<ress[0].broj_prostorija; i++){
              ress[0].prostorije[i].boja_popuna = 'white'
            }
            ress[0]._id  = p.objekat
            this.objService.azuriraj(ress[0]).subscribe((resss)=>{
              if(resss){
                window.location.reload()
              }
            })
          }
        })
        
      }
    })
  }
  zahtev_za_otkazivanjem(id){
    for(let n of this.zahtevi_za_otkazivanjem){
      if(n[id]){
        return true;
      }
    }
    return false;
  }
  dohvati_detalje_zahteva(id){
    //console.log("pozvan")
    for(let n of this.zahtevi_za_otkazivanjem_detalji){
      //console.log(n)
      if(n[id]){
        return n[id];
      }
    }
    return null
  }
  listner_action(){
    try{
      this.cdRef.detectChanges();
      
    
      this.prozor_s = window.innerWidth;
      this.prozor_v = window.innerHeight;
      this.konteksti = []
      
      for(let i=0; i<this.canvasi.length; i++){
        //console.log(this.canvasi.get(i))
        this.konteksti.push(this.canvasi.get(i).nativeElement.getContext('2d'))
      }
      this.iscrtaj()
    }catch{

    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cdRef.detectChanges();
    setTimeout(()=>{
    
    this.prozor_s = window.innerWidth;
    this.prozor_v = window.innerHeight;
    /*for(let i=0; i<this.canvasi.length; i++){
  
      this.canvasi.get(i).nativeElement.width = (this.prozor_s<769) ? 285 :((this.prozor_s<993) ? 400 : 600)
      this.canvasi.get(i).nativeElement.height = (this.prozor_s<769) ? 178 :((this.prozor_s<993) ? 250 : 350)
      //this.objekti[i].sirina_kanvasa = (this.prozor_s<429) ? 285 :((this.prozor_s<717) ? 400 : 600)
    }
    //this.skaliranje()
    this.iscrtaj()
    for(let i=0; i<this.canvasi.length; i++){
      this.objekti[i].sirina_kanvasa = (this.prozor_s<769) ? 285 :((this.prozor_s<993) ? 400 : 600)
    }*/
  },1)}
  inicijalizuj(){
    for(let i=0; i<this.br_obj; i++){
      this.prostorije.push(this.objekti[(this.poslovi[i])['_id']][0].prostorije)
      let temp:Vrata[] = []
      for(let j=0; j<this.objekti[(this.poslovi[i])['_id']][0].prostorije.length; j++){
        for(let k=0; k<this.objekti[(this.poslovi[i])['_id']][0].prostorije[j].vrata.length; k++)
        temp.push(this.objekti[(this.poslovi[i])['_id']][0].prostorije[j].vrata[k])
      }
      this.vrata.push(temp)
    }
  
  }
  kreditna_err(){
    if(this.br_kred_kartice.length>19){
      return false;
    }else return true;
  }
  kreditna_input(){
    this.br_kred_kartice = this.br_kred_kartice.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
  ngAfterViewInit(){
  
    
    if(this.setovan){

      //console.log(this.canvasi.length)
      for(let i=0; i<this.canvasi.length; i++){
        //console.log(this.canvasi.get(i))
        this.konteksti.push(this.canvasi.get(i).nativeElement.getContext('2d'))
      }

      //this.skaliranje()
      this.iscrtaj()
    }
    
    //while(!this.setovan) {}
    
  }
  
  iscrtaj(){
    //console.log("pozvan uz br obj "+this.objekti.length)
    for(let i=0; i<this.br_obj; i++){
      //console.log("imamo nesto 1")
      this.konteksti[i].clearRect(0,0,this.canvasi.get(i).nativeElement.width, this.canvasi.get(i).nativeElement.height)
      let j=0;
          for(let m=0; m<this.prostorije[i].length;m++){
            //console.log("imamo nesto 2")
           let p = this.prostorije[i][m];
            if(p['postavljeno']){
              //console.log("imamo nesto 3")
              this.konteksti[i].fillStyle = String(p.boja_popuna);
              this.konteksti[i].strokeStyle = String(p.boja_okvir);
              this.konteksti[i].fillRect(p['pozicija_x'],p['pozicija_y'],p['sirina'],p['visina'])
              this.konteksti[i].strokeRect(p['pozicija_x'],p['pozicija_y'],p['sirina'],p['visina'])
              this.konteksti[i].font="20px Georgia";
              this.konteksti[i].textAlign="center"; 
              this.konteksti[i].textBaseline = "middle";
              this.konteksti[i].fillStyle = "#000000";
              this.konteksti[i].fillText((j+1)+"",p['pozicija_x']+(p['sirina']/2),p['pozicija_y']+(p['visina']/2));
            }else{
            }
            j++;
          }
          for(let k=0; k<this.vrata[i].length; k++){
         
                this.iscrtaj_svg(i, k)
           
          }
    }
  }
  iscrtaj_svg(j, i){
    //console.log("j je "+j+" a i je "+i)
    let old_s = this.objekti[(this.poslovi[j])['_id']].sirina_kanvasa
    this.konteksti[j].save()
    this.konteksti[j].fillStyle=this.vrata[j][i].boja
              this.konteksti[j].beginPath()
              let p = new Path2D("M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z");
              this.konteksti[j].translate(this.vrata[j][i].pozicija_x+(this.vrata[j][i].strana == 1 || this.vrata[j][i].strana==4 ? 16 : ( this.vrata[j][i].strana == 3 ? -16 : 0)),this.vrata[j][i].pozicija_y-(this.vrata[j][i].strana == 3 || this.vrata[j][i].strana == 4? -16 : 16))
              let ugao = 0;
              switch(this.vrata[j][i].strana){
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
              this.konteksti[j].rotate(ugao)
              
              this.konteksti[j].fill(p);
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
              
           
              this.konteksti[j].closePath()
              this.konteksti[j].restore()
  }
  razlog:string = ""
  otkazi(id){

    if(this.razlog=="") {
      console.log(this.razlog + " je razlog")
      return;
    }
    this.gotovo=false;
    const data={
      posao:id,
      klijent:this.ulogovan.korisnicko_ime,
      razlog:this.razlog,
      status: "Послат"
    }
    this.posloviService.zahtev_za_otkazivanjem(data).subscribe((res)=>{
      if(res['message']=='ok'){
        this.gotovo=true;
        let obj1 = {}
        obj1[id] = true
        let obj2 = {}
        obj2[id] = data
        this.zahtevi_za_otkazivanjem.push(obj1)
        this.zahtevi_za_otkazivanjem_detalji.push(obj2)
        window.location.reload()
      }else{

        this.gotovo=true;
      }
    })
  }
  filtriraj(){
    console.log("pozvan filtriraj")
    let niz:Posao[] = []
    for(let i=0; i<this.poslovi_original.length; i++){
      let p = this.poslovi_original[i]

      if(!this.aktivni_filter && !this.zavrseni_filter && !this.zahtevi_filter) {
        this.poslovi = this.poslovi_original
        this.listner_action()
        //this.iscrtaj()
        //this.ngAfterViewInit()
      
        return
      }
      if((p.status=="Активан") && this.aktivni_filter){
        niz.push(p)
      }
      if((p.status=="Завршен") && this.zavrseni_filter){
        niz.push(p)
      }
      if((p.status=="Послат захтев" || p.status=="Прихваћен" ||p.status=="Спреман за плаћање") && this.zahtevi_filter){
        niz.push(p)
      }
    }
    this.poslovi = niz
    this.listner_action()
    //this.ngAfterViewInit()
    //this.iscrtaj()

  }
  filtriraj_aktivni(){
    this.aktivni_filter = !this.aktivni_filter
    this.filtriraj()
  }
  filtriraj_zavrseni(){
    this.zavrseni_filter = !this.zavrseni_filter
    this.filtriraj()
  }
  filtriraj_zahtevi(){
    this.zahtevi_filter = !this.zahtevi_filter
    this.filtriraj()
  }
  
  odbij(p:Posao){
    const data={
      _id:p._id
    }
    this.posloviService.obrisi(data).subscribe((res)=>{
      if(res){
        this.ngOnInit()
        this.ngAfterViewInit()
      }
      else console.log("err odbij")
    })
  }
  prihvati(p:Posao){
    console.log("pozvan")
    p.status="Активан"
    p.placen = false;
    this.posloviService.azuriraj(p).subscribe((res)=>{
      if(res){
        this.objService.dohvati_objekat(p.objekat).subscribe((ob:Objekat[])=>{
          let obj=ob[0]
          for(let i=0; i<obj.prostorije.length; i++){
            obj.prostorije[i].boja_popuna = "yellow"
          }
     
          this.objService.azuriraj(obj).subscribe((res)=>{
            if(res['message']=='ok') {
              window.location.reload()
            }
          }
          )
        })
       
      }else{
        console.log("err prihvati")
      }
    })

  }
}
