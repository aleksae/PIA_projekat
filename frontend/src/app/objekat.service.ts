import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjekatService {

  constructor(private http:HttpClient) { }

  sve_za_korisnika(korisnik: string){
    let data={
      korisnik : korisnik
    }
    return this.http.post('http://localhost:4000/objekti/dohvati_sve_za_korisnika',data)
  }
  brisanje(id:string){
    let data={
      id:id
    }
    return this.http.post('http://localhost:4000/objekti/brisanje',data)
  }
  dohvati_objekat(id:string){
    const data ={
      id:id
    }
    return this.http.post('http://localhost:4000/objekti/dohvati_jedan',data)
  }
  azuriraj(data){
    return this.http.post('http://localhost:4000/objekti/azuriraj',data)
  }
}
