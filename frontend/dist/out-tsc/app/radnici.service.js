import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let RadniciService = class RadniciService {
    constructor(http) {
        this.http = http;
    }
    dohvati_sve_za_agenciju(id) {
        const data = {
            id: id
        };
        return this.http.post('http://localhost:4000/radnici/dohvati_sve_za_agenciju', data);
    }
    dodaj_zahtev_za_radna_mesta(id, broj_mesta) {
        const data = {
            id: id,
            broj_mesta: broj_mesta
        };
        return this.http.post('http://localhost:4000/radnici/dodaj_zahtev_za_radna_mesta', data);
    }
    dodaj_radnika(data) {
        return this.http.post('http://localhost:4000/radnici/dodaj', data);
    }
    azuriraj_radnika(data) {
        return this.http.post('http://localhost:4000/radnici/azuriraj', data);
    }
    obrisi_radnika(id) {
        const data = {
            id: id
        };
        return this.http.post('http://localhost:4000/radnici/obrisi', data);
    }
    dohvati_zahteve_za_radna_mesta_za_agenciju(id) {
        const data = {
            agencija: id
        };
        return this.http.post('http://localhost:4000/radnici/dohvati_zahteve_za_radna_mesta_za_agenciju', data);
    }
    dohvati_zahteve_za_radna_mesta() {
        const data = {};
        return this.http.post('http://localhost:4000/radnici/dohvati_zahteve_za_radna_mesta', data);
    }
};
RadniciService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RadniciService);
export { RadniciService };
//# sourceMappingURL=radnici.service.js.map