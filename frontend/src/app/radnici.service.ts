import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadniciService {

  constructor(private http:HttpClient) { }

  dohvati_sve_za_agenciju(id:string){
    const data = {
      id:id
    }
    return this.http.post('http://localhost:4000/radnici/dohvati_sve_za_agenciju', data)
  }
  dodaj_zahtev_za_radna_mesta(id:string, broj_mesta:number){
    const data={
      agencija:id,
      broj_mesta:broj_mesta,
      status:"poslato"
    }
    return this.http.post('http://localhost:4000/radnici/dodaj_zahtev_za_radna_mesta', data)
  }
  dodaj_radnika(data:any){
    return this.http.post('http://localhost:4000/radnici/dodaj', data)
  }
  azuriraj_radnika(data:any){
    return this.http.post('http://localhost:4000/radnici/azuriraj', data)
  }
  obrisi_radnika(id:string){
    const data={
      id:id
    }
    return this.http.post('http://localhost:4000/radnici/obrisi', data)
  }
  dohvati_zahteve_za_radna_mesta_za_agenciju(id:string){
    const data={
      agencija:id
    }
    return this.http.post('http://localhost:4000/radnici/dohvati_zahteve_za_radna_mesta_za_agenciju', data)
  }
  dohvati_zahteve_za_radna_mesta(){
    const data={}
    return this.http.post('http://localhost:4000/radnici/dohvati_zahteve_za_radna_mesta', data)
  }
  oslobodi_radnika_posao_prostorija(posao, pr){
    const data={
      angazovan:posao,
      prostorija:pr
    }

    return this.http.post('http://localhost:4000/radnici/oslobodi_radnika_posao_prostorija', data)
  }
  azuriraj_zahtev_za_radnim_mestom(data){
    return this.http.post('http://localhost:4000/radnici/azuriraj_zahtev_za_radnim_mestom', data)
  }

 
}

