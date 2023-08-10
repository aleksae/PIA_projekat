import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrijavljivanjeService {

  
  constructor(private http: HttpClient) { 
    
  }
  prijava(korisnicko_ime, lozinka){
   const data = {
     korisnicko_ime: korisnicko_ime,
     lozinka: lozinka
   }
   let d = this.http.post('http://localhost:4000/korisnici/prijava',data);

   return d;
 }

}
