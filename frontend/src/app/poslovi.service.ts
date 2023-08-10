import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosloviService {

  constructor(private http:HttpClient) { }

  dodaj_posao(data){
    return this.http.post("http://localhost:4000/poslovi/dodaj", data)
  }
  dohvati_sve_za_klijenta(data){
    data = {id:data}
    return this.http.post("http://localhost:4000/poslovi/sve_za_klijenta", data)
  }
  dohvati_sve_za_agenciju(data){
    data = {id:data}
    return this.http.post("http://localhost:4000/poslovi/sve_za_agenciju", data)
  }
  azuriraj_zahtev_za_otkazivanjem(data){
    return this.http.post("http://localhost:4000/poslovi/azuriraj_zahtev_za_otkazivanjem", data)
  }
  zahtev_za_otkazivanjem(data){
    return this.http.post("http://localhost:4000/poslovi/zahtev_za_otkazivanjem", data)
  }
  dohvati_zahtev_za_otkazivanjem(id){
    const data = {id:id}
    return this.http.post("http://localhost:4000/poslovi/dohvati_zahtev_za_otkazivanjem", data)
  }
  azuriraj(data){
    return this.http.post("http://localhost:4000/poslovi/azuriraj", data)
  }
  obrisi(data){
    return this.http.post("http://localhost:4000/poslovi/obrisi", data)
  }
  dohvati_sve(){
    const data = {}
    return this.http.post("http://localhost:4000/poslovi/sve", data)
  }

  
}
