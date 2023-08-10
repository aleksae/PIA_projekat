import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  private baseUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) { 
    
   }
   prijava(korisnicko_ime, lozinka){
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    return this.http.post('http://localhost:4000/korisnici/prijava',data)
  }
  sviKorisnici(){
    return this.http.get('http://localhost:4000/korisnici/svi_korisnici')
  }
  registracija(k_ime, lozinka, telefon, mejl, fns, dodatno, uloga, admin){
    console.log("pozvana front registracija");
    const data = {
      "korisnicko_ime" : k_ime,
      "lozinka" : lozinka,
      'br_telefona' : telefon,
      "imejl" : mejl,
      "uloga" : uloga,
      "profilna_slika":fns,
      "dodatno" : dodatno,
      "odobren" : admin,
      "оdbijen":false,
    }
    console.log(admin)

    return this.http.post('http://localhost:4000/korisnici/registracija',data)
  }

  reset_lozinke(mejl: string){
    let data={
      mejl : mejl
    }
    return this.http.post('http://localhost:4000/posalji_mejl',data)
  }
  dohvati_tokene(){
    return this.http.get('http://localhost:4000/dohvati_tokene')
  }
  promeni_lozinku(lozinka: string, mejl:string, token:string){
    const data={
      lozinka: lozinka,
      mejl: mejl,
      token:token
      
    }
    return this.http.post('http://localhost:4000/korisnici/promena_lozinke',data)
  }
  azuriraj_klijenta(k_ime:string, ime:string, prezime:string, telefon:number, mejl:string, slika:string){
    const data={
      korisnicko_ime: k_ime,
      dodatno:{
        ime: ime,
        prezime: prezime
      },
      br_telefona: telefon,
      profilna_slika: slika,
      imejl: mejl
    }
    console.log("pristigli mejl je " + mejl)
    return this.http.post('http://localhost:4000/korisnici/azuriraj_klijenta', data);
  }
  azuriraj_agenciju(k_ime:string, naziv:string,  adresa:string, opis: string, maticni_broj: number,telefon:number, mejl:string, slika:string){
    console.log("usao")
    const data={
      korisnicko_ime: k_ime,
      dodatno:{
        adresa: adresa,
        opis: opis,
        naziv: naziv,
        maticni_broj: maticni_broj
      },
      br_telefona: telefon,
      profilna_slika: slika,
      imejl: mejl
    }
    console.log("slika je "+slika)
    console.log(data)
    return this.http.post('http://localhost:4000/korisnici/azuriraj_klijenta', data);
  }
  dohvati_komentare(id:string){
    const data={
      id: id
    }
    return this.http.post('http://localhost:4000/korisnici/komentari_za_agenciju', data);
  }
  dohvati_komentare_klijent(id:string){
    const data={
      id: id
    }
    return this.http.post('http://localhost:4000/korisnici/komentari_za_klijenta', data);
  }
  dodaj_komentar(data){
    return this.http.post('http://localhost:4000/korisnici/dodaj_komentar', data);
  }
  uredi_komentar(data){
    return this.http.post('http://localhost:4000/korisnici/uredi_komentar', data);
  }
  obrisi_komentar(data){
    return this.http.post('http://localhost:4000/korisnici/obrisi_komentar', data);
  }
  dohvati_korisnika(id:string){
    const data={
      id: id
    }
    return this.http.post('http://localhost:4000/korisnici/dohvati_korisnika', data);
  }
  odobrenost(data){
    return this.http.post('http://localhost:4000/korisnici/odobrenost', data);
  }

  obrisi_korisnika(id){
    const data={
      korisnicko_ime:id
    }
    return this.http.post('http://localhost:4000/korisnici/obrisi', data);
  }

}
