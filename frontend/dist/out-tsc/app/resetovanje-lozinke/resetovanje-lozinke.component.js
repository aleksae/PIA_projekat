import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as sha512 from 'js-sha512';
let ResetovanjeLozinkeComponent = class ResetovanjeLozinkeComponent {
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
    }
    ngOnInit() {
        this.obradjeno = false;
        var token = this.route.snapshot.params['id'];
        console.log(token);
        var pronadjen = false;
        this.korisnikService.dohvati_tokene().subscribe((tokeni) => {
            tokeni.forEach((tok) => {
                if (tok.token == token) {
                    pronadjen = true;
                    token = tok;
                }
            });
            if (!pronadjen)
                this.greska = "Токен не постоји!";
            else if (!(new Date(token.rok_vazenja) > new Date()))
                this.greska = "Токен је истекао!";
            else {
                this.greska = null;
            }
            if (!this.greska) {
                this.mejl = token.mejl;
                let istice = new Date(token.rok_vazenja);
                let trenutno = new Date();
                let razlika = Math.abs(istice.getTime() - trenutno.getTime());
                setTimeout(() => {
                    console.log("usao");
                    this.greska = "Токен је истекао!";
                }, razlika);
            }
            this.obradjeno = true;
        });
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
        const obj = {
            'message': 'ok'
        };
        this.korisnikService.promeni_lozinku(sha512.sha512(this.lozinka), this.mejl, this.route.snapshot.params['id']).subscribe((result) => {
            let res = JSON.stringify(result);
            result = JSON.parse(res);
            if (result['message'] == "updated")
                this.router.navigate(['prijava']);
            else
                this.greska = "Дошло је до грешке. Освежите страницу и пробајте опет.";
        });
    }
};
ResetovanjeLozinkeComponent = __decorate([
    Component({
        selector: 'app-resetovanje-lozinke',
        templateUrl: './resetovanje-lozinke.component.html',
        styleUrls: ['./resetovanje-lozinke.component.css']
    })
], ResetovanjeLozinkeComponent);
export { ResetovanjeLozinkeComponent };
//# sourceMappingURL=resetovanje-lozinke.component.js.map