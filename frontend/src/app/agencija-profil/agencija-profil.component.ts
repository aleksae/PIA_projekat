import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { HttpClient } from '@angular/common/http';
import { BroadcastService } from '../broadcast.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-agencija-profil',
  templateUrl: './agencija-profil.component.html',
  styleUrls: ['./agencija-profil.component.css']
})
export class AgencijaProfilComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private http:HttpClient, private broadcastService: BroadcastService,
    private router:Router, private route: ActivatedRoute) { 

  }

  //fu
  greska:string;
  uploadedFiles: Array < File > ;
  imageSrc: string;
  img_w:number;
  img_h:number;
  img_err:boolean =false;
  filename_server : string = "";
  slanje_u_toku : boolean = false;
  
  fileChange(element) {
    this.uploadedFiles = element.target.files;
    
    let event = element;
    let reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        
   
      };
      
      let img = new Image()
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        this.img_w = img.width;
        this.img_h = img.height;
        let val = (this.img_h > 300 ||this.img_h <100 || this.img_w <100 || this.img_w >300 ) 
        this.greska =val? "слика није одговарајуће величоне" : null
        if(val){
          this.imageSrc = null;
          this.uploadedFiles=null;
          this.img_err = true;
        }else{
          this.img_err = false;
          
        }
      }
      
    }else{
      this.uploadedFiles = null;
      this.imageSrc = null;
    }


  
    
  }
  //endfu
  ulogovan: any;
  naziv: string;
  adresa: string;
  telefon: number;
  mejl: string;
  korisnici: Korisnik[]
  postoji_mejl:boolean=false;
  poruka_o_stanju:string;
  opis:string
  k_iz_rute:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.k_iz_rute = params.get('id')
    })
    this.korisnikService.sviKorisnici().subscribe((kIzBaze: Korisnik[])=>{
      this.korisnici = kIzBaze;
      if(this.router.url.indexOf('admin')>-1) {
        for(let k of this.korisnici){
          if(k.korisnicko_ime==this.k_iz_rute){ this.ulogovan = k
            console.log(k)
            this.naziv = this.ulogovan['dodatno'].naziv;
            this.opis = this.ulogovan.dodatno.opis
            this.adresa = this.ulogovan.dodatno.adresa
            this.mejl = this.ulogovan.imejl
            this.telefon = this.ulogovan.br_telefona
          }
        }
      }
      else {this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
      this.naziv = this.ulogovan.dodatno.naziv;
      this.opis = this.ulogovan.dodatno.opis
      this.adresa = this.ulogovan.dodatno.adresa
      this.mejl = this.ulogovan.imejl
      this.telefon = this.ulogovan.br_telefona}
    })
    
   
  }
  format_mejl(){
    if(this.greska) this.greska!=null;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl);
  }
  check() {
    if(this.greska) this.greska!=null;
    let set_in_iter_mejl = false;
    
      if(!this.korisnici) return;
      this.korisnici.forEach( (clan)=>{
        
        if(clan.imejl==this.mejl && clan.korisnicko_ime!=this.ulogovan.korisnicko_ime){
          this.postoji_mejl = true;
          set_in_iter_mejl = true;
        }
        else if(!set_in_iter_mejl)  this.postoji_mejl  = false;
      
    }
    )
    return ;
  }

  azuriraj_ulogovan(prof){
    console.log("alskesa")
    this.ulogovan.dodatno['naziv'] = this.naziv;
    this.ulogovan.dodatno['adresa'] = this.adresa;
    this.ulogovan.dodatno['opis'] = this.opis;
    this.ulogovan.br_telefona = this.telefon;
    this.ulogovan.imejl = this.mejl
    this.ulogovan.profilna_slika = prof;
    localStorage.removeItem("agencija");
   
    if(!this.k_iz_rute) localStorage.setItem("agencija", JSON.stringify(this.ulogovan));
    if(!this.k_iz_rute) this.broadcastService.azurirajUlogovanog.next({ status: 1 });
    this.ngOnInit();
    this.uploadedFiles = null;
    this.imageSrc = null;
    setTimeout(()=>{
      this.poruka_o_stanju = null
    }, 5000)
 
  }

  obrisi_sliku(){
    this.http.get('http://localhost:4000/brisanje_slike/'+this.ulogovan.profilna_slika).subscribe((res)=>{
    })
    this.korisnikService.azuriraj_agenciju(this.ulogovan.korisnicko_ime,this.naziv, this.adresa, this.opis, this.ulogovan.dodatno['maticni_broj'], this.telefon, this.mejl, "").subscribe(respObj=>{
    })
    this.azuriraj_ulogovan("")
  }
  async azuriraj(){
    if(((this.postoji_mejl)  || !this.naziv || !this.adresa || !this.opis || !this.telefon || !this.mejl ||!this.format_mejl() || this.img_err)){
      this.greska = "Неисправно унети подаци!";
      console.log((this.postoji_mejl) )
      console.log(!(this.naziv) )
      console.log(!(this.adresa) )
      console.log(!(this.opis) )
      console.log(!(this.telefon) )
      console.log(!(this.mejl) )
      console.log(!this.format_mejl())
      console.log(this.img_err)
      return;
    }

    this.slanje_u_toku = true;
    if(this.uploadedFiles){
      if(this.uploadedFiles.length!=0){
        interface responseExtended extends Response{
          fileName:any;
        }
        let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        
      
       
        await this.http.post('http://localhost:4000/fajlovi/otpremanje', formData)
            .subscribe(async (response : responseExtended) => {
                if(this.ulogovan.profilna_slika!='')await this.http.get('http://localhost:4000/brisanje_slike/'+this.ulogovan.profilna_slika).subscribe();
                this.filename_server =  response.fileName;
                this.korisnikService.azuriraj_agenciju(this.ulogovan.korisnicko_ime,this.naziv, this.adresa, this.opis, this.ulogovan.dodatno['maticni_broj'], this.telefon, this.mejl, this.filename_server).subscribe(async respObj=>{
                  if(respObj['message']=="ok") {
                    window.scroll({ 
                      top: 0, 
                      left: 0, 
                      behavior: 'smooth' 
                    });
                    this.slanje_u_toku = false;
                    this.poruka_o_stanju = "Подаци успешно ажурирани";
                    this.azuriraj_ulogovan(this.filename_server)
                  }
                });
            })
      }
      else{

        this.korisnikService.azuriraj_agenciju(this.ulogovan.korisnicko_ime, this.naziv, this.adresa, this.opis, this.ulogovan.dodatno['maticni_broj'], this.telefon, this.mejl, this.ulogovan.profilna_slika).subscribe(async respObj=>{
          if(respObj['message']=="ok") {
            window.scroll({ 
              top: 0, 
              left: 0, 
              behavior: 'smooth' 
            });
            this.slanje_u_toku = false;
            this.poruka_o_stanju = "Подаци успешно ажурирани";
            this.azuriraj_ulogovan(this.ulogovan.profilna_slika)
          }else{
          }
        });
      }
    }else{

    this.korisnikService.azuriraj_agenciju(this.ulogovan.korisnicko_ime,this.naziv, this.adresa, this.opis, this.ulogovan.dodatno['maticni_broj'], this.telefon, this.mejl,  this.ulogovan.profilna_slika).subscribe(async respObj=>{
      if(respObj['message']=="ok") {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        this.slanje_u_toku = false;
        this.poruka_o_stanju = "Подаци успешно ажурирани";
        this.azuriraj_ulogovan(this.ulogovan.profilna_slika)
      }
    });
  }
  }

}

