import { Component, OnInit,  ElementRef, HostListener, ViewChildren, QueryList, ChangeDetectorRef} from '@angular/core';
import { ObjekatService } from '../objekat.service';
import { Objekat } from '../models/objekat';
import { Korisnik } from '../models/korisnik';
import { Prostorija } from '../models/prostorija';
import { Vrata } from '../models/vrata';
import { BroadcastService } from '../broadcast.service';

@Component({
  selector: 'app-pregled-objekata-klijent',
  templateUrl: './pregled-objekata-klijent.component.html',
  styleUrls: ['./pregled-objekata-klijent.component.css']
})
export class PregledObjekataKlijentComponent implements OnInit {

  constructor(private objekatService: ObjekatService, private cdRef:ChangeDetectorRef, private broadcastService: BroadcastService) { 
    
  }

  @ViewChildren('skica_objekta') private canvasi: QueryList<ElementRef>;
  
  objekti : Objekat[] = []
  ulogovan : Korisnik = JSON.parse(localStorage.getItem('klijent'))
  prozor_s:number=null;
  prozor_v:number=null;
  setovan=false;
  
  prostorije: Array<Prostorija[]>  =[]
  vrata: Array<Vrata[]> = []
  konteksti: CanvasRenderingContext2D[]=[];
  old_s:number 
  poruka:string
  status:boolean;
  ngOnInit(): void {
    console.log("poceno ngOnInit")
    
    
    console.log(this.uspeh)
   
    this.objekatService.sve_za_korisnika(this.ulogovan.korisnicko_ime).subscribe((objekti:Objekat[])=>{
      this.objekti = objekti
      this.broadcastService.porukaOStatusu.subscribe((msg: any) => {
        if(msg['status']==1) {
          console.log(msg['poruka'])
          this.uspeh = msg['poruka']
          console.log(this.uspeh)
          setTimeout(()=>{
            this.uspeh = null
          },5000)
        }
      })
      
      this.inicijalizuj()
      /*this.iscrtaj()*/
      this.setovan=true;
      setTimeout(()=>{
        this.ngAfterViewInit()}, 0
      )
    })
    this.prozor_s = window.innerWidth;
    this.prozor_v = window.innerHeight;
    
    console.log("gotov ngOnInit")
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
},1)
  
  
}
inicijalizuj(){
  for(let i=0; i<this.objekti.length; i++){
    this.prostorije.push(this.objekti[i].prostorije)
    let temp:Vrata[] = []
    for(let j=0; j<this.objekti[i].prostorije.length; j++){
      for(let k=0; k<this.objekti[i].prostorije[j].vrata.length; k++)
      temp.push(this.objekti[i].prostorije[j].vrata[k])
    }
    this.vrata.push(temp)
  }

}

ngOnViewInit(){

 
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
  for(let i=0; i<this.objekti.length; i++){
    this.konteksti[i].clearRect(0,0,this.canvasi.get(i).nativeElement.width, this.canvasi.get(i).nativeElement.height)
    let j=0;
        for(let m=0; m<this.prostorije[i].length;m++){
         let p = this.prostorije[i][m];
          if(p['postavljeno']){
            this.konteksti[i].fillStyle = p.boja_popuna;
            this.konteksti[i].strokeStyle = p.boja_okvir;
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

skaliranje(){
  for(let k=0; k<this.objekti.length;k++){
    let old_s = this.objekti[k].sirina_kanvasa
    for(let i=0; i<this.prostorije[k].length; i++){
      if(old_s==600 && this.canvasi.get(k).nativeElement.width == 400 || old_s==400 && this.canvasi.get(k).nativeElement.width==285){
        this.prostorije[k][i].pozicija_x *=0.6667
        this.prostorije[k][i].pozicija_y *=0.7142
        this.prostorije[k][i].sirina *=0.6667
        this.prostorije[k][i].visina *=0.7142
        for(let j=0; j<this.vrata[k].length; j++){
          if(this.vrata[k][j].prostorija == i) {
            this.vrata[k][j].pozicija_x *=0.6667
            this.vrata[k][j].pozicija_y *=0.7142
          }
        }
      }else if(old_s==600 && this.canvasi.get(k).nativeElement.width ==285){
        this.prostorije[k][i].pozicija_x *=0.6667*0.6667
        this.prostorije[k][i].pozicija_y *=0.7142*0.7142
        this.prostorije[k][i].sirina *=0.6667*0.6667
        this.prostorije[k][i].visina *=0.7142*0.7142
        for(let j=0; j<this.vrata[k].length; j++){
          if(this.vrata[k][j].prostorija == i) {
            this.vrata[k][j].pozicija_x *=0.6667*0.6667
            this.vrata[k][j].pozicija_y *=0.7142*0.7142
          }
        }
      }else if(old_s==400 && this.canvasi.get(k).nativeElement.width == 600 || old_s==285 && this.canvasi.get(k).nativeElement.width==400){
        this.prostorije[k][i].pozicija_x /=0.6667
        this.prostorije[k][i].pozicija_y /=0.7142
        this.prostorije[k][i].sirina /=0.6667
        this.prostorije[k][i].visina /=0.7142
        for(let j=0; j<this.vrata[k].length; j++){
          if(this.vrata[k][j].prostorija == i) {
            this.vrata[k][j].pozicija_x /=0.6667
            this.vrata[k][j].pozicija_y /=0.7142
          }
        }
      }else{
        this.prostorije[k][i].pozicija_x /=0.6667/0.6667
        this.prostorije[k][i].pozicija_y /=0.7142/0.7142
        this.prostorije[k][i].sirina /=0.6667/0.6667
        this.prostorije[k][i].visina /=0.7142/0.7142
        for(let j=0; j<this.vrata[k].length; j++){
          if(this.vrata[k][j].prostorija == i) {
            this.vrata[k][j].pozicija_x /=0.6667/0.6667
            this.vrata[k][j].pozicija_y /=0.7142/0.7142
          }
        }
      }
    }
}
}
iscrtaj_svg(j, i){
  //console.log("j je "+j+" a i je "+i)
  let old_s = this.objekti[j].sirina_kanvasa
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
uspeh:string;
brisanje(id){
  this.objekatService.brisanje(id).subscribe((resp)=>{
    if(resp['message']=="ok"){
      this.uspeh = "Објекат је успешно обрисан."
      setTimeout(()=>{
        this.uspeh = null
      },5000)
      for(let i=0; i<this.objekti.length; i++){
        if(this.objekti[i]._id == id) {
          this.objekti.splice(i, 1)
          i--;
        }
      }
    }
  })
}



}
