import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AgencijaRadniciComponent = class AgencijaRadniciComponent {
    constructor(servis) {
        this.servis = servis;
        this.slobodni = 0;
        this.br_radnika = 0;
        this.br_radnih_mesta_odobreno = 0;
        this.br_radnih_mesta_na_cekanju = 0;
    }
    ngOnInit() {
        this.ulogovan = JSON.parse(localStorage.getItem("agencija"));
        this.servis.dohvati_sve_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res) => {
            if (res.length) {
                this.radnici = res;
                this.br_radnika = this.radnici.length;
                for (let r of this.radnici) {
                    if (!r.aganzovan)
                        this.slobodni++;
                }
            }
        });
        this.servis.dohvati_zahteve_za_radna_mesta_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res) => {
            if (res.length) {
                for (let r of res) {
                    if (r.status == 'odobreno')
                        this.br_radnih_mesta_odobreno += r.broj_mesta;
                    else if (r.status == 'poslato')
                        this.br_radnih_mesta_na_cekanju += r.broj_mesta;
                }
            }
        });
    }
    posalji_zahtev_za_radna() {
    }
};
AgencijaRadniciComponent = __decorate([
    Component({
        selector: 'app-agencija-radnici',
        templateUrl: './agencija-radnici.component.html',
        styleUrls: ['./agencija-radnici.component.css']
    })
], AgencijaRadniciComponent);
export { AgencijaRadniciComponent };
//# sourceMappingURL=agencija-radnici.component.js.map