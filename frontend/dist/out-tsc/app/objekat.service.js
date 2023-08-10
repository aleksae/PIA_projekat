import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ObjekatService = class ObjekatService {
    constructor(http) {
        this.http = http;
    }
    sve_za_korisnika(korisnik) {
        let data = {
            korisnik: korisnik
        };
        return this.http.post('http://localhost:4000/objekti/dohvati_sve_za_korisnika', data);
    }
    brisanje(id) {
        let data = {
            id: id
        };
        return this.http.post('http://localhost:4000/objekti/brisanje', data);
    }
    dohvati_objekat(id) {
        const data = {
            id: id
        };
        return this.http.post('http://localhost:4000/objekti/dohvati_jedan', data);
    }
};
ObjekatService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ObjekatService);
export { ObjekatService };
//# sourceMappingURL=objekat.service.js.map