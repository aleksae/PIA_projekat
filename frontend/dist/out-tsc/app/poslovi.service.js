import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PosloviService = class PosloviService {
    constructor(http) {
        this.http = http;
    }
    dodaj_posao(data) {
        return this.http.post("http://localhost:4000/poslovi/dodaj", data);
    }
    dohvati_sve_za_klijenta(data) {
        data = { id: data };
        return this.http.post("http://localhost:4000/poslovi/sve_za_klijenta", data);
    }
    dohvati_sve_za_agenciju(data) {
        data = { id: data };
        return this.http.post("http://localhost:4000/poslovi/sve_za_agenciju", data);
    }
    zahtev_za_otkazivanjem(data) {
        return this.http.post("http://localhost:4000/poslovi/zahtev_za_otkazivanjem", data);
    }
    dohvati_zahtev_za_otkazivanjem(id) {
        const data = { id: id };
        return this.http.post("http://localhost:4000/poslovi/dohvati_zahtev_za_otkazivanjem", data);
    }
};
PosloviService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PosloviService);
export { PosloviService };
//# sourceMappingURL=poslovi.service.js.map