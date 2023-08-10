import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ZaboravljenaLozinkaComponent = class ZaboravljenaLozinkaComponent {
    constructor(korisnikService) {
        this.korisnikService = korisnikService;
        this.mejl_greska = false;
        this.mejl_postoji = true;
        this.mejl_razlicit = false;
        this.poslato = false;
    }
    ngOnInit() {
        this.korisnikService.sviKorisnici().subscribe((kIzBaze) => {
            this.korisnici = kIzBaze;
        });
    }
    mejl_isti() {
        if (this.mejl != this.mejl_potvrda)
            this.mejl_razlicit = true;
        else
            this.mejl_razlicit = false;
    }
    postoji_mejl() {
        let set_in_iter_mejl = false;
        if (!this.mejl) {
            this.mejl_postoji = true;
            this.mejl_greska = false;
        }
        else if (this.mejl == "" || this.mejl == " ") {
            this.mejl_postoji = true;
            this.mejl_greska = false;
        }
        else {
            this.korisnici.forEach((korisnik) => {
                if (korisnik.imejl == this.mejl) {
                    this.mejl_postoji = true;
                    set_in_iter_mejl = true;
                }
                else if (!set_in_iter_mejl)
                    this.mejl_postoji = false;
            });
        }
    }
    format_mejl() {
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl);
        if (!res)
            this.mejl_greska = true;
        else
            this.mejl_greska = false;
        return res;
    }
    posalji() {
        this.korisnikService.reset_lozinke(this.mejl).subscribe((resp) => {
            this.poslato = true;
        });
    }
};
ZaboravljenaLozinkaComponent = __decorate([
    Component({
        selector: 'app-zaboravljena-lozinka',
        templateUrl: './zaboravljena-lozinka.component.html',
        styleUrls: ['./zaboravljena-lozinka.component.css']
    })
], ZaboravljenaLozinkaComponent);
export { ZaboravljenaLozinkaComponent };
//# sourceMappingURL=zaboravljena-lozinka.component.js.map