import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as sha512 from 'js-sha512';
let PromenaLozinkeComponent = class PromenaLozinkeComponent {
    constructor(route, korisnikService, router) {
        this.route = route;
        this.korisnikService = korisnikService;
        this.router = router;
        this.lozinka_7 = true;
        this.lozinka_12 = true;
        this.lozinka_vs = true;
        this.lozinka_broj = true;
        this.lozinka_sk = true;
        this.lozinka_pocinje_slovom = true;
        this.lozinke_iste = true;
        this.lozinka_stara_greska = false;
        this.lozinka_ista = false;
    }
    ngOnInit() {
        let k = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
        4;
        this.mejl = k.imejl;
        this.korisnikService.sviKorisnici().subscribe((kIzBaze) => {
            kIzBaze.forEach((korisnik) => {
                if (korisnik.korisnicko_ime == k.korisnicko_ime) {
                    this.stara = korisnik.lozinka;
                    console.log(this.stara);
                }
            });
        });
    }
    check_stara() {
        if (!this.lozinka_stara)
            return;
        let lh = sha512.sha512(this.lozinka_stara);
        if (lh != this.stara)
            this.lozinka_stara_greska = true;
        else
            this.lozinka_stara_greska = false;
    }
    check_pass() {
        if (this.lozinka == null || this.lozinka.length == 0) {
            this.lozinka_7 = true;
            this.lozinka_12 = true;
            this.lozinka_vs = true;
            this.lozinka_broj = true;
            this.lozinka_sk = true;
            this.lozinka_pocinje_slovom = true;
            return;
        }
        ;
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (this.lozinka.search(/[A-Z]/) < 0)
            this.lozinka_vs = false;
        this.lozinka_vs = true;
        if (this.lozinka.length < 7)
            this.lozinka_7 = false;
        else
            this.lozinka_7 = true;
        if (this.lozinka.length > 12)
            this.lozinka_12 = false;
        else
            this.lozinka_12 = true;
        if (!/\d/.test(this.lozinka))
            this.lozinka_broj = false;
        else
            this.lozinka_broj = true;
        if (!format.test(this.lozinka))
            this.lozinka_sk = false;
        else
            this.lozinka_sk = true;
        if (!/[A-Za-z]/.test(this.lozinka.charAt(0)))
            this.lozinka_pocinje_slovom = false;
        else
            this.lozinka_pocinje_slovom = true;
        if (!/[A-Z]/.test(this.lozinka))
            this.lozinka_vs = false;
        else
            this.lozinka_vs = true;
        if (this.lozinka_stara == this.lozinka)
            this.lozinka_ista = true;
        else
            this.lozinka_ista = false;
    }
    check_pass_opet() {
        if (this.lozinka == null) {
            this.lozinka_7 = true;
            this.lozinka_12 = true;
            this.lozinka_vs = true;
            this.lozinka_broj = true;
            this.lozinka_sk = true;
            this.lozinka_pocinje_slovom = true;
            return true;
        }
        ;
        if (this.lozinka == this.lozinka_opet)
            this.lozinke_iste = true;
        else
            this.lozinke_iste = false;
        return this.lozinke_iste;
    }
    promeni_lozinku() {
        this.korisnikService.promeni_lozinku(sha512.sha512(this.lozinka), this.mejl, "-1").subscribe((result) => {
            let res = JSON.stringify(result);
            result = JSON.parse(res);
            if (result['message'] == "updated") {
                localStorage.removeItem("klijent");
                localStorage.removeItem("agencija");
                this.router.navigate(['prijava']);
            }
            else
                this.greska = "Дошло је до грешке. Освежите страницу и пробајте опет.";
        });
    }
};
PromenaLozinkeComponent = __decorate([
    Component({
        selector: 'app-promena-lozinke',
        templateUrl: './promena-lozinke.component.html',
        styleUrls: ['./promena-lozinke.component.css']
    })
], PromenaLozinkeComponent);
export { PromenaLozinkeComponent };
//# sourceMappingURL=promena-lozinke.component.js.map