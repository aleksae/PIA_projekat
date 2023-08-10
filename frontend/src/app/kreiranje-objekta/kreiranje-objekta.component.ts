import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef} from '@angular/core';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BroadcastService } from '../broadcast.service';
import { ObjekatService } from '../objekat.service';

@Component({
  selector: 'app-kreiranje-objekta',
  templateUrl: './kreiranje-objekta.component.html',
  styleUrls: ['./kreiranje-objekta.component.css']
})
export class KreiranjeObjektaComponent implements OnInit {
  
  @ViewChild('skica_objekta') canvas: ElementRef;
  kontekst: CanvasRenderingContext2D;
  adresa:string
  tip:string
  kvadratura:number;
  broj_prostorija : number
  prostorije: Array<Prostorija> = [
  ];
  br_prostorija_niz: any;
  canvas_sirina;
  canvas_visina;
  canvas_offset_levo;
  canvas_offset_gore;
  greska:string;
  pomeranje_u_toku : boolean = false;
  constructor(private cdRef:ChangeDetectorRef,private objServ:ObjekatService, private http:HttpClient, private router:Router, private broadcastService: BroadcastService, private route:ActivatedRoute) {
    this.br_prostorija_niz = Array.from(Array(this.broj_prostorija).keys())
  }
  selektovan:number;
  sirina_ekrana:number;
  prozor_s:number=null;
  prozor_v:number=null;
  desniKlik(event){
  let r = this.proveri_da_li_obuhvata_vrata(event.offsetX, event.offsetY)
  if(r != -1){
    this.vrata[r].boja = 'red'
    this.vrata.splice(r, 1);
  }
  this.iscrtaj()
  return false;
  }
  @HostListener('window:resize', ['$event'])
onResize(event) {
  //console.log('resize '+window.innerWidth+', '+window.innerHeight)
  this.prozor_s = window.innerWidth;
  this.prozor_v = window.innerHeight;
  this.canvas.nativeElement.width = (this.prozor_s<429) ? 285 :((this.prozor_s<717) ? 400 : 600)
  this.canvas.nativeElement.height = (this.prozor_s<429) ? 178 :((this.prozor_s<717) ? 250 : 350)
  let old_s, old_v;
  setTimeout(()=>{
   //console.log("stara pocetna je : ("+this.canvas_offset_levo+","+this.canvas_offset_gore+")" + " stara krajnja je :("+(this.canvas_offset_levo+this.canvas_sirina)+","+(this.canvas_offset_gore+this.canvas_visina)+")")
    this.cdRef.detectChanges();
    old_s = this.canvas_sirina
    old_v = this.canvas_visina
    this.canvas_sirina = (this.prozor_s<429) ? 285 :((this.prozor_s<717) ? 400 : 600)
    this.canvas_visina = (this.prozor_s<429) ? 178 :((this.prozor_s<717) ? 250 : 350)
    /*this.canvas_offset_levo = this.canvas.nativeElement.offsetLeft;
    this.canvas_offset_gore = this.canvas.nativeElement.offsetTop;*/
    this.prozor_s = window.innerWidth;
    this.prozor_v = window.innerHeight;
    this.canvas.nativeElement.width = (this.prozor_s<429) ? 285 :((this.prozor_s<717) ? 400 : 600)
    this.canvas.nativeElement.height = (this.prozor_s<429) ? 178 :((this.prozor_s<717) ? 250 : 350)
    /**
     * TO DO sirina po default na osnovu velicina prozora kao u html tagu
     */
    //console.log("dosao")
    this.kontekst = this.canvas.nativeElement.getContext('2d');
    //this.kontekst.scale(this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    
    /**********
     * TEST
     */
    for(let i=0; i<this.prostorije.length; i++){
      if(old_s==600 && this.canvas_sirina == 400 || old_s==400 && this.canvas_sirina==285){
        this.prostorije[i].pozicija_x *=0.6667
        this.prostorije[i].pozicija_y *=0.7142
        this.prostorije[i].sirina *=0.6667
        this.prostorije[i].visina *=0.7142
        for(let j=0; j<this.vrata.length; j++){
          if(this.vrata[j].prostorija == i) {
            this.vrata[j].pozicija_x *=0.6667
            this.vrata[j].pozicija_y *=0.7142
          }
        }
      }else if(old_s==600 && this.canvas_sirina ==285){
        this.prostorije[i].pozicija_x *=0.6667*0.6667
        this.prostorije[i].pozicija_y *=0.7142*0.7142
        this.prostorije[i].sirina *=0.6667*0.6667
        this.prostorije[i].visina *=0.7142*0.7142
        for(let j=0; j<this.vrata.length; j++){
          if(this.vrata[j].prostorija == i) {
            this.vrata[j].pozicija_x *=0.6667*0.6667
            this.vrata[j].pozicija_y *=0.7142*0.7142
          }
        }
      }else if(old_s==400 && this.canvas_sirina == 600 || old_s==285 && this.canvas_sirina==400){
        this.prostorije[i].pozicija_x /=0.6667
        this.prostorije[i].pozicija_y /=0.7142
        this.prostorije[i].sirina /=0.6667
        this.prostorije[i].visina /=0.7142
        for(let j=0; j<this.vrata.length; j++){
          if(this.vrata[j].prostorija == i) {
            this.vrata[j].pozicija_x /=0.6667
            this.vrata[j].pozicija_y /=0.7142
          }
        }
      }else{
        this.prostorije[i].pozicija_x /=0.6667/0.6667
        this.prostorije[i].pozicija_y /=0.7142/0.7142
        this.prostorije[i].sirina /=0.6667/0.6667
        this.prostorije[i].visina /=0.7142/0.7142
        for(let j=0; j<this.vrata.length; j++){
          if(this.vrata[j].prostorija == i) {
            this.vrata[j].pozicija_x /=0.6667/0.6667
            this.vrata[j].pozicija_y /=0.7142/0.7142
          }
        }
      }
      this.prostorije[i].pozicija_x = (this.prostorije[i].pozicija_x)
      this.prostorije[i].pozicija_y = (this.prostorije[i].pozicija_y)
      this.prostorije[i].sirina = (this.prostorije[i].sirina)
      this.prostorije[i].visina = (this.prostorije[i].visina)
    }
    /**********
     * END TEST
     */
      this.iscrtaj()

    },0)
   // console.log("nova pocetna je : ("+this.canvas_offset_levo+","+this.canvas_offset_gore+")" + " nova krajnja je :("+(this.canvas_offset_levo+this.canvas_sirina)+","+(this.canvas_offset_gore+this.canvas_visina)+")")

this.sirina_ekrana = window.innerWidth;
  }
  azuriraj_prikaz_glavno(n){
    if(n){
      if(this.adresa==null) {
        this.greska="Адреса је обавезна"
        return;
      }
      if(!(this.tip=="Кућа" || this.tip=="Стан")){
        this.greska="Тип објекта је обавезан"
        return;
      }
      if(this.broj_prostorija == null || this.broj_prostorija<=0 || this.broj_prostorija>3){
        this.greska = "Број просторија мора бити 1, 2 или 3"
        
        return;
      }
      if(this.kvadratura == null || this.kvadratura<=0){
        this.greska = "Неисправна квадратура"
        return;
      }
    }
    //console.log(this.broj_prostorija)
    this.greska=null
    this.aktivno_crtanje = n;
    if(n){
      this.ngAfterViewInit()
      if(!this.id_obj) this.postaviProstorije()
      if(this.id_obj) this.iscrtaj()
    }
  }
 
  aktivno_crtanje:boolean =false;
  id_obj:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id_obj = params.get('id')
    })
    //console.log("ngOnInit")
    /*this.postaviProstorije()*/
    this.prozor_s = window.innerWidth;
    this.prozor_v = window.innerHeight;
    if(this.router.url.indexOf('uredjivanje')>-1){
      this.objServ.dohvati_objekat(this.id_obj).subscribe((res)=>{
        if(res){
          let objekat = res[0]
          this.prostorije = objekat['prostorije']
          for(let i=0; i<this.prostorije.length; i++){
            for(let j=0; j<this.prostorije[i].vrata.length;j++){
              this.vrata.push(this.prostorije[i].vrata[j])
            }
          }
          
          this.adresa = objekat['adresa']
          this.broj_prostorija = objekat['broj_prostorija']
          this.kvadratura = objekat['kvadratura']
          this.tip = objekat['tip']
        }
        
      })
    }
    
  }

  ngAfterViewInit() {
    //console.log("ngAftreView")
    this.kontekst = this.canvas.nativeElement.getContext('2d');
    this.canvas_sirina = this.canvas.nativeElement.width;
    this.canvas_visina = this.canvas.nativeElement.height;
    this.canvas_offset_levo = this.canvas.nativeElement.offsetLeft;
    this.canvas_offset_gore = this.canvas.nativeElement.offsetTop;
    //console.log(this.canvas)
    //console.log("init pocetna je : ("+this.canvas_offset_levo+","+this.canvas_offset_gore+")" + " init krajnja je :("+(this.canvas_offset_levo+this.canvas_sirina)+","+(this.canvas_offset_gore+this.canvas_visina)+")")
  
  }
 
  izabran_za_postavljanje:number = null;
  /**
   * postavljanje na cavnas prvi deo
   */
  postavi_select(prostorija:number){
    if(this.prostorije[prostorija].visina ==0 || this.prostorije[prostorija].sirina ==0) {
      this.greska="Не може се додати просторија са ширином или висином која је 0";
      return;
    }else if(this.prostorije[prostorija].visina>this.canvas_visina || this.prostorije[prostorija].sirina>this.canvas_sirina){
      this.greska="Не може се додати просторија са ширином или висином која је веча од канваса";
      return;
    }else{
      this.greska=null;
    }
    if(this.izabran_za_postavljanje==prostorija) {
      this.prostorije[this.izabran_za_postavljanje].pozicija_x = -1;
      this.prostorije[this.izabran_za_postavljanje].pozicija_y = -1;
      this.iscrtaj()
      this.izabran_za_postavljanje = null
    }
    else this.izabran_za_postavljanje = prostorija;
    
    
    
  }
  
  /**
   * proverava da li ima preklapanja prostorija
   * povrtane vrednost:
   * -1 => pomeri na dole za 1
   * -2 => pomeri na levo za 1
   * 0  => ima preklpanja
   * 1 => pomeri an desno za 1
   * 2 => pomeri na gpre za 1
   * 3 => sve ok ne pomeraj
   * pomeranja su radi stilizovanja i brisanja
   */
  proveri_preklapanje(event, x1, y1, s1, v1){
    s1 = s1+x1;
    v1 = y1+v1;
    //console.log("oznacen je "+this.oznacen)  
    for(let j=0; j<this.prostorije.length; j++){
      let x = this.prostorije[j].pozicija_x
      let y = this.prostorije[j].pozicija_y
      let s = x+this.prostorije[j].sirina
      let v = y+this.prostorije[j].visina

      if(this.izabran_za_postavljanje == j || this.oznacen == j) {}
      else if(this.prostorije[j].postavljeno){
        //console.log("usao "+j)  
        
        if(x<s1 && y<v1 && x1<s && y1<v){
          return 0;
        }else{
        }
        //proveri ovo za stilizovanje
        //if(x1-s<3 && x1-s>0) return [1,x1-s]
        //else if(x-s1<2 && x-s1>=0) return [-2,x-s1]
        //else if(y1-v<2 && y1-v>=0) return [-1,y1-v]
        //else if(v1-y<2 && v1-y>=0) return [2,v1-y]
      }else{
        continue;
      }
      //console.log("izasao "+j)  
    }
    if(s1>this.canvas_sirina || v1>this.canvas_visina) return 0;
    return 3;
  }

  iscrtaj_svg(i){
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
           
              this.kontekst.closePath()
              this.kontekst.restore()
  }
  simuliran:Prostorija=null;


  poceto_pomeranje:boolean = false;
  oznacen:number=-1;
  iscrtaj(){

    
    this.kontekst.clearRect(0,0,this.canvas_sirina, this.canvas_visina)
    let j=0;
        for(let p of this.prostorije){
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
        for(let i=0; i<this.vrata.length; i++){
       
              this.iscrtaj_svg(i)
         
        }
  }
  /*interna_provera(x, y, v, s, x1, y1, s1, v1){
    if(x>s1 || x1>s){ return true}
    if(v>y1 || v1>y){ return true}
    return false;
  }
  kretanje_ima_preklapanja(event){
    let x = event.offsetX;
    let y = event.offsetY;
    let s = this.prostorije[this.oznacen].sirina
    let v = this.prostorije[this.oznacen].visina
    let i=0;
    for(let p of this.prostorije){
      let x1 = p.pozicija_x
      let y1 = p.pozicija_y
      let s1 = p.sirina
      let v1 = p.visina
      if(i==this.oznacen) continue;
      if(p.postavljeno){
        if(!this.interna_provera(x,y,s,v,x1,y1,s1,v1)) return 1;
      }
    }
    return 0;

  }*/
  /*proveri_preklapanje_kretanje(x,y,s,v){
    let i =0;
    s=x+s
    v=y+v
    for(let p of this.prostorije){
      let x1 = p.pozicija_x
      let y1 = p.pozicija_y
      let s1 = p.sirina
      s1=x1+s1
      let v1 = p.visina
      y1=v1+y1
      let ind=false;
      if(p.postavljeno){
        if(i==this.oznacen) {}
        else {
          console.log("check")
          //konfilkt po x
          if(x1>s || s1>x) ind = false;
          //konfilk po y
          else if(v<y1 || y>v1) ind = false;
          else ind = true;
        }
        console.log(ind + "provera za "+i + " u odnosu na glavni "+this.oznacen)
        if(ind) return 0;
      }
      i++
    }
    return 1;

  }*/
  greska_na_canvasu=false;
  staro_x = -1;
  staro_y = -1;
  izabrana_vrata = null;
  
  azuriraj_vrata(event){
    for(let i=0; i<this.vrata.length; i++){
      if(this.vrata[i].prostorija == this.oznacen){
        switch(this.vrata[i].strana){
          case 1:
            this.vrata[i].pozicija_x += -(this.prostorije[this.oznacen].pozicija_x-event.offsetX)
            this.vrata[i].pozicija_y += -(this.prostorije[this.oznacen].pozicija_y - event.offsetY)
            break;
          case 2:
            this.vrata[i].pozicija_x += -(this.prostorije[this.oznacen].pozicija_x-event.offsetX)
            this.vrata[i].pozicija_y += -(this.prostorije[this.oznacen].pozicija_y - event.offsetY)
            break;
          case 3:
            this.vrata[i].pozicija_x += -(this.prostorije[this.oznacen].pozicija_x-event.offsetX)
            this.vrata[i].pozicija_y += -(this.prostorije[this.oznacen].pozicija_y - event.offsetY)
            break;
          case 4:
            this.vrata[i].pozicija_x += -(this.prostorije[this.oznacen].pozicija_x-event.offsetX)
            this.vrata[i].pozicija_y += -(this.prostorije[this.oznacen].pozicija_y - event.offsetY)
            break;
        }
      }
    }
  }
  proveri_da_li_obuhvata_vrata(x1, y1){
    for(let i=0; i<this.vrata.length; i++){
        let x, y, s, v;
        switch(this.vrata[i].strana){
          case 1:
            x = this.vrata[i].pozicija_x
            y = this.vrata[i].pozicija_y-16
            s = x+16
            v = y+16
            break;
          case 2:
            x = this.vrata[i].pozicija_x
            y = this.vrata[i].pozicija_y-16
            s = x+16
            v = y+16
            break;
          case 3:
            x = this.vrata[i].pozicija_x-16
            y = this.vrata[i].pozicija_y
            s = x+16
            v = y+16
            break;
          case 4:
            x = this.vrata[i].pozicija_x
            y = this.vrata[i].pozicija_y
            s = x+16
            v = y+16
            break;
        }
        if(x1>x && x1<s && y1>y && y1<v) return i;

    }
    return -1
  }
  prethodni_klik_x:number;
  prethodni_klik_y:number;
  postavi(event){  
    if(this.izabran_za_postavljanje==null){
      if(this.selektovana_vrata!=null){
        if(event.type!='click') return;
        //this.iscrtaj()
        let x = this.vrata[this.selektovana_vrata].pozicija_x =  event.offsetX
        let y = this.vrata[this.selektovana_vrata].pozicija_y = event.offsetY
        let p = this.prostorije[this.vrata[this.selektovana_vrata].prostorija]
        let px = p.pozicija_x
        let py = p.pozicija_y
        let ps = p.pozicija_x+ p.sirina
        let pv = p.pozicija_y+p.visina
        if((((px-3)<x && (px+3)>x) ||
        ((ps-3)<x && (ps+3)>x) ||
        ((py-3)<y && (py+3)>y) ||
        ((pv-3)<y && (pv+3)>y))&&(
          x>=px && x<=ps && y>=py && y<=pv
        )
        ) {
          //sve ok
          this.greska=null
          if((px-4)<x && (px+4)>x)this.vrata[this.selektovana_vrata].strana = 1
          else if((ps-4)<x && (ps+4)>x) this.vrata[this.selektovana_vrata].strana = 3
          else if((py-4)<y && (py+4)>y) this.vrata[this.selektovana_vrata].strana = 4
          else this.vrata[this.selektovana_vrata].strana = 2
          
        }
        else{
          this.vrata.splice(this.selektovana_vrata,1)
          this.greska="Врата морају стајати на зиду"
        }
        this.iscrtaj()
        this.selektovana_vrata = null;
        return;
      }
      if(!this.poceto_pomeranje && event.type=='mousedown' && event.type!='click'){
        //vrata
        let r = this.proveri_da_li_obuhvata_vrata(event.offsetX, event.offsetY)
        if(r != -1){
          //console.log("usao")
          this.izabrana_vrata = r;
          this.vrata[r].boja = '#F2AF00'
          this.iscrtaj()
          this.prethodni_klik_x = event.offsetX
          this.prethodni_klik_y = event.offsetY
          return;
          
        }
        //nisu vrata
        let res = this.proveri_da_li_obuhavata(event.offsetX, event.offsetY);
        if(res ==-1) return;
        else {
          this.oznacen = res;
          this.poceto_pomeranje = true;

        }
      
        
        
      }else if(event.type!='click' && event.type!='mouseup' && this.poceto_pomeranje){
        //this.prostorije[this.oznacen].boja_okvir = '#F2AF00'
        if(this.proveri_preklapanje(event, event.offsetX, event.offsetY, this.prostorije[this.oznacen].sirina, this.prostorije[this.oznacen].visina)==0){
           this.prostorije[this.oznacen].boja_okvir = 'red'
           this.greska_na_canvasu=true;
           this.greska = "Просторије се не смеју преклапати!"
        }
        else {
          this.prostorije[this.oznacen].boja_okvir = '#F2AF00'
          this.greska_na_canvasu=false;
          this.greska = null;
          
        }
        this.azuriraj_vrata(event)
        this.prostorije[this.oznacen].pozicija_x = event.offsetX
        this.prostorije[this.oznacen].pozicija_y = event.offsetY
        
        this.iscrtaj();
      }else if(event.type!='click' && event.type!='mouseup' && this.izabrana_vrata!=null){
        /**
         * idemo za vrata
         *
         */
        let vrata = this.vrata[this.izabrana_vrata]
        let pom;
        let sum;
        switch(vrata.strana){
          case 1:
            pom = (event.offsetY - this.prethodni_klik_y)
            sum = this.vrata[this.izabrana_vrata].pozicija_y+pom
            this.vrata[this.izabrana_vrata].pozicija_y += (sum>=this.prostorije[vrata.prostorija].pozicija_y+16 && sum <= (this.prostorije[vrata.prostorija].pozicija_y+this.prostorije[vrata.prostorija].visina) ? pom : 0)
            //console.log(event.offsetY)
            break;
          case 2:
            pom = (event.offsetX - this.prethodni_klik_x)
            sum = this.vrata[this.izabrana_vrata].pozicija_x+ pom
            this.vrata[this.izabrana_vrata].pozicija_x += (sum>=this.prostorije[vrata.prostorija].pozicija_x && sum <= (this.prostorije[vrata.prostorija].pozicija_x+this.prostorije[vrata.prostorija].sirina-16) ? pom : 0)
            break;
          case 3:
            pom = (event.offsetY - this.prethodni_klik_y)
            sum = this.vrata[this.izabrana_vrata].pozicija_y+pom
            this.vrata[this.izabrana_vrata].pozicija_y += (sum>=this.prostorije[vrata.prostorija].pozicija_y && sum <= (this.prostorije[vrata.prostorija].pozicija_y+this.prostorije[vrata.prostorija].visina)-16 ? pom : 0)
            break;
          case 4:
            pom = (event.offsetX - this.prethodni_klik_x)
            sum = this.vrata[this.izabrana_vrata].pozicija_x+ pom
            this.vrata[this.izabrana_vrata].pozicija_x += (sum>=this.prostorije[vrata.prostorija].pozicija_x && sum <= (this.prostorije[vrata.prostorija].pozicija_x+this.prostorije[vrata.prostorija].sirina)-16 ? pom : 0)
            break;
        }
        this.prethodni_klik_x = event.offsetX
        this.prethodni_klik_y = event.offsetY
        this.iscrtaj()
        //console.log("asads")
      }else if(event.type=='mouseup'){
        try{
          /**vrata */
          if(this.izabrana_vrata!=null){
            this.vrata[this.izabrana_vrata].boja = 'black';
            this.izabrana_vrata = null;
            this.iscrtaj();
            return;
          }
          /**kraj vrata */
          if(this.proveri_preklapanje(event, event.offsetX, event.offsetY, this.prostorije[this.oznacen].sirina, this.prostorije[this.oznacen].visina)==0){
            this.prostorije[this.oznacen].boja_okvir = 'red'
            this.greska="Просторија "+(this.oznacen+1)+" је на недозвољеној позицији!"
          }
          this.prostorije[this.oznacen].boja_okvir = 'black'
          this.oznacen = null;
          this.poceto_pomeranje = false;
          this.simuliran = new Prostorija()
          this.iscrtaj();
          if(this.proveri_ispravnost()<0){
            this.greska='Просторије нису правилно распоређене'
          }
        }catch{

        }
      }
    } 
    else if(event.type == 'click'){
      //postavljanje novog objekta
      
 
      let p = this.prostorije[this.izabran_za_postavljanje]
  
      let res = this.proveri_preklapanje(event, event.offsetX, event.offsetY, p.sirina, p.visina);
      if(res==0){
        this.kontekst.strokeStyle='red';
        this.kontekst.strokeRect(event.offsetX, event.offsetY, p.sirina, p.visina)
        this.kontekst.strokeStyle='black';
        this.greska="Не сме бити преклапања просторија";
        return;
      }else{
        this.greska = null
      }
      let pom_x=0, pom_y=0
      /*switch(res[0]){
        case -1:
          //na dole za 1
          pom_y = res[1]
          break;
        case -2:
          //na levo za 1
          pom_x= -(res[1])
          break;
        case 1:
          //desno 1
          pom_x = (res[1])
          break;
        case 2:
          pom_y=-(res[1])
          break;
        default:
          pom_x = pom_y= 0;
          break;
      }*/
      
      this.prostorije[this.izabran_za_postavljanje].pozicija_x = event.offsetX+pom_x
      this.prostorije[this.izabran_za_postavljanje].pozicija_y = event.offsetY+pom_y
      //console.log(this.prostorije[this.izabran_za_postavljanje]);
      //console.log('click je '+event.offsetX+", "+event.offsetY)
      this.kontekst.strokeStyle='black'
      this.kontekst.strokeRect(event.offsetX+pom_x, event.offsetY+pom_y, p.sirina, p.visina)
      this.prostorije[this.izabran_za_postavljanje].postavljeno = true;
      
      this.izabran_za_postavljanje=null;
      if(this.proveri_ispravnost()<0){
        this.greska="Просторије нису исправно распоређене."
      }else{
        this.greska = null;
      }
      this.iscrtaj()
      return;
    }else if(event.type=="mousemove"){
      
      
      this.iscrtaj();
      this.simuliran = new Prostorija()
      this.kontekst.beginPath()
      
      this.simuliran.pozicija_x = event.offsetX
      this.simuliran.pozicija_y = event.offsetY
      this.simuliran.visina = this.prostorije[this.izabran_za_postavljanje].visina
      this.simuliran.sirina = this.prostorije[this.izabran_za_postavljanje].sirina
      let res = this.proveri_preklapanje(event, event.offsetX, event.offsetY,  this.simuliran.sirina,  this.simuliran.visina);
      this.simuliran.boja_okvir = res==0 ? "red" :"black"
      if(res==0) this.greska="Просторије се не смеју преклапати!"
      this.kontekst.strokeStyle = this.simuliran.boja_okvir
      this.kontekst.strokeRect(this.simuliran.pozicija_x, this.simuliran.pozicija_y, this.simuliran.sirina, this.simuliran.visina)
      this.kontekst.closePath()
      //
    }else if(event.type == 'mouseout'){
      if(this.izabran_za_postavljanje!=null){
        this.prostorije[this.izabran_za_postavljanje].postavljeno = false;
        this.prostorije[this.izabran_za_postavljanje].pozicija_x = -1;
        this.prostorije[this.izabran_za_postavljanje].pozicija_y = -1;
      }else if(this.oznacen!=null){
        this.prostorije[this.oznacen].postavljeno = false;
        this.prostorije[this.oznacen].pozicija_x = -1;
        this.prostorije[this.oznacen].pozicija_y = -1;
      }
      try{
      this.prostorije[this.oznacen].boja_okvir = 'black'
      }catch{

      }
      this.iscrtaj()
      if(this.proveri_ispravnost()<0){
        this.greska='Просторије нису правилно распоређене'
      }
    }

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
 
  selektovana_vrata:number = null;


  vrata:Array<Vrata> = []

  dodaj_vrata(n){
    let vrata= new Vrata();
    vrata.prostorija = n;
    this.vrata.push(vrata)
    //console.log(this.vrata.length)
    this.selektovana_vrata = this.vrata.length-1;
    
  }

  ukloni(n){
    let p = this.prostorije[n]

    this.prostorije[n].postavljeno = false
    this.izabran_za_postavljanje=null;
    let novi_niz = []
    for(let i=0; i<this.vrata.length; i++){
      if(this.vrata[i].prostorija==n){
        
      }else{
        novi_niz.push(this.vrata[i])
      }
    }
    this.vrata = novi_niz
    this.iscrtaj();

  }

  postaviProstorije(){
    //console.log("postavi prostorije")
    this.prostorije = []
    this.vrata = []
    //console.log("pozvano" +this.broj_prostorija)
    for(let i=0; i<this.broj_prostorija;i++){
      let p= new Prostorija();
      p.visina=0;
      p.sirina=0;
      p.postavljeno=false;
      this.prostorije.push(p)
    }
    this.iscrtaj()

  }
  
  proveri_ispravnost(){
    //console.log("provera_pocela")
    let cnt=0;
    for(let i=0; i<this.prostorije.length; i++){
      cnt += this.prostorije[i].postavljeno ? 1:0
    }
    let temp = cnt==1 ? 3: (cnt==2) ? 2 : 0
    for(let i=0; i<this.prostorije.length; i++){
      let p = this.prostorije[i]
      for(let j=0; j<this.prostorije.length; j++){
        
        let pp = this.prostorije[j]
        if(i!=j && p.postavljeno && pp.postavljeno){
          if(((p.pozicija_x-(pp.pozicija_x+pp.sirina))<=2 && (p.pozicija_x-(pp.pozicija_x+pp.sirina))>=0 )|| 
          (((pp.pozicija_x)-(p.pozicija_x+p.sirina))<=2 && ((pp.pozicija_x)-(p.pozicija_x+p.sirina))>=0 )|| 
          ((p.pozicija_y-(pp.pozicija_y+pp.visina))<=2 && (p.pozicija_y-(pp.pozicija_y+pp.visina))>=0)|| 
          ((pp.pozicija_y-(p.pozicija_y+p.visina))<=2 && (pp.pozicija_y-(p.pozicija_y+p.visina))>=0)){
            temp++
          }else{
          }
        }
      }
      
    }
    if(temp<=2) return -1;
    return 0;
  }
  dodaj(){
    if(this.greska) return;
    for(let i=0; i<this.vrata.length; i++){
      this.prostorije[this.vrata[i].prostorija].vrata.push(this.vrata[i])
    }
    const objekat = {
      _id:this.id_obj,
      tip: this.tip,
      adresa: this.adresa,
      kvadratura: this.kvadratura,
      broj_prostorija : this.broj_prostorija,
      sirina_kanvasa: this.canvas_sirina,
      korisnik: JSON.parse(localStorage.getItem("klijent")).korisnicko_ime,
      prostorije: this.prostorije
    }
    console.log(objekat)
    if(this.id_obj){
      this.http.post('http://localhost:4000/objekti/azuriraj', objekat).subscribe((resp)=>{
        try{
          if(resp['message']=='ok'){
            this.broadcastService.porukaOStatusu.next({ status: 1, poruka:"Објекат је успешно ажуриран." });
            this.router.navigate(['klijent/objekti/pregled'])
          }else{
            this.greska = "Дошло је до грешке. Покушајте поново."
          }
        }catch{
          this.greska = "Дошло је до грешке. Покушајте поново."
        }
      })
    }
      else{this.http.post('http://localhost:4000/objekti/dodaj', objekat).subscribe((resp)=>{
        try{
          if(resp['message']=='ok'){
            this.broadcastService.porukaOStatusu.next({ status: 1, poruka:"Објекат је успешно додат." });
            this.router.navigate(['klijent/objekti/pregled'])
          }else{
            this.greska = "Дошло је до грешке. Покушајте поново."
          }
        }catch{
          this.greska = "Дошло је до грешке. Покушајте поново."
        }
      })
    }

  }
}

