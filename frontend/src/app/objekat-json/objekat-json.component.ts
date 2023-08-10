import { Component, OnInit } from '@angular/core';
import { Objekat } from '../models/objekat';
import { Prostorija } from '../models/prostorija';
import { ObjekatService } from '../objekat.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objekat-json',
  templateUrl: './objekat-json.component.html',
  styleUrls: ['./objekat-json.component.css']
})
export class ObjekatJsonComponent implements OnInit {

  constructor(private objServ:ObjekatService, private http:HttpClient, private router:Router) { }

  selectedFile: File
  json:JSON
  objekat:Objekat
  greska:string
  ngOnInit(): void {
  }
  promenjenFajl(event) {
    try{
    this.objekat = new Objekat()
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
    let string = <string>fileReader.result
     try{let json = JSON.parse(string)
      this.json = json[0]
      this.objekat.adresa = this.json['adresa']
      this.objekat.tip = this.json['tip']
      this.objekat.broj_prostorija = this.json['broj_prostorija']
      this.objekat.sirina_kanvasa = 600
      this.objekat.kvadratura = this.json['kvadratura']
      this.objekat.prostorije = this.prostorije =  this.json['prostorije']
      this.provera()
      console.log(this.objekat)
      }
     catch(err){
      console.log(err)
     }
      }
    }catch(err){

    }
    
  }
  prostorije:Prostorija[] = []
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
  uspeh:string;
  provera(){
    this.uspeh = ''
    if(typeof this.json['adresa']=== 'undefined' || typeof this.json['tip']=== 'undefined'|| typeof this.json['broj_prostorija']=== 'undefined' || typeof this.json['kvadratura']=== 'undefined'){
      this.greska = "Нисте унели основне податке!"
      
    }else{
      this.greska = ""
    }
    if(this.proveri_ispravnost()==-1){
      if(this.greska!='')
        this.greska += "<br>Просторије нису исправно распоређене"
      else this.greska = "Просторије нису исправно распоређене"
    }else{
      this.greska = ""
    }
    if(this.greska==''){
      this.uspeh = "Фајл је исправан :)"
    }

  }
  sacuvaj(){
    if(!this.uspeh) return;
    this.http.post('http://localhost:4000/objekti/dodaj', this.objekat).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.router.navigate(['klijent/objekti/pregled'])
      }else{
        this.greska = "Грешка при постављању, пробајте поново."
      }
    })
  }
}
