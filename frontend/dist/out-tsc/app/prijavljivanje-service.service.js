import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PrijavljivanjeService = class PrijavljivanjeService {
    constructor(http) {
        this.http = http;
    }
    prijava(korisnicko_ime, lozinka) {
        const data = {
            korisnicko_ime: korisnicko_ime,
            lozinka: lozinka
        };
        let d = this.http.post('http://localhost:4000/korisnici/prijava', data);
        return d;
    }
};
PrijavljivanjeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PrijavljivanjeService);
export { PrijavljivanjeService };
//# sourceMappingURL=prijavljivanje-service.service.js.map