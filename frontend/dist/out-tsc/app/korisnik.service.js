import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let KorisnikService = class KorisnikService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:4000';
    }
    prijava(korisnicko_ime, lozinka) {
        const data = {
            korisnicko_ime: korisnicko_ime,
            lozinka: lozinka
        };
        return this.http.post('http://localhost:4000/korisnici/prijava', data);
    }
    sviKorisnici() {
        return this.http.get('http://localhost:4000/korisnici/svi_korisnici');
    }
    registracija(k_ime, lozinka, telefon, mejl, fns, dodatno, uloga) {
        console.log("pozvana front registracija");
        const data = {
            "korisnicko_ime": k_ime,
            "lozinka": lozinka,
            'br_telefona': telefon,
            "imejl": mejl,
            "uloga": uloga,
            "profilna_slika": fns,
            "dodatno": dodatno,
            "odobren": false
        };
        return this.http.post('http://localhost:4000/korisnici/registracija', data);
    }
    reset_lozinke(mejl) {
        let data = {
            mejl: mejl
        };
        return this.http.post('http://localhost:4000/posalji_mejl', data);
    }
    dohvati_tokene() {
        return this.http.get('http://localhost:4000/dohvati_tokene');
    }
    promeni_lozinku(lozinka, mejl, token) {
        const data = {
            lozinka: lozinka,
            mejl: mejl,
            token: token
        };
        return this.http.post('http://localhost:4000/korisnici/promena_lozinke', data);
    }
    azuriraj_klijenta(k_ime, ime, prezime, telefon, mejl, slika) {
        const data = {
            korisnicko_ime: k_ime,
            dodatno: {
                ime: ime,
                prezime: prezime
            },
            br_telefona: telefon,
            profilna_slika: slika,
            imejl: mejl
        };
        console.log("pristigli mejl je " + mejl);
        return this.http.post('http://localhost:4000/korisnici/azuriraj_klijenta', data);
    }
    azuriraj_agenciju(k_ime, naziv, adresa, opis, maticni_broj, telefon, mejl, slika) {
        console.log("usao");
        const data = {
            korisnicko_ime: k_ime,
            dodatno: {
                adresa: adresa,
                opis: opis,
                naziv: naziv,
                maticni_broj: maticni_broj
            },
            br_telefona: telefon,
            profilna_slika: slika,
            imejl: mejl
        };
        console.log("slika je " + slika);
        console.log(data);
        return this.http.post('http://localhost:4000/korisnici/azuriraj_klijenta', data);
    }
    dohvati_komentare(id) {
        const data = {
            id: id
        };
        return this.http.post('http://localhost:4000/korisnici/komentari_za_agenciju', data);
    }
    dohvati_korisnika(id) {
        const data = {
            id: id
        };
        return this.http.post('http://localhost:4000/korisnici/dohvati_korisnika', data);
    }
};
KorisnikService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], KorisnikService);
export { KorisnikService };
//# sourceMappingURL=korisnik.service.js.map