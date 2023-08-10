import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let AgencijaPrikazComponent = class AgencijaPrikazComponent {
    constructor(route, router, korisnik, objService, posloviService) {
        this.route = route;
        this.router = router;
        this.korisnik = korisnik;
        this.objService = objService;
        this.posloviService = posloviService;
        this.ulogovan = null;
        this.skraceni_opis = true;
        this.min_datum = new Date().toISOString().split("T")[0];
        this.ucitano = 0;
        this.break = false;
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
        });
    }
    prosiri_opis() {
        console.log("usao");
        this.skraceni_opis = false;
        this.opis_za_prikaz = this.agencija.dodatno['opis'];
    }
    ngOnInit() {
        if (localStorage.getItem('klijent') || localStorage.getItem('agencija')) {
            this.ulogovan = JSON.parse(localStorage.getItem('klijent')) || JSON.parse(localStorage.getItem('agencija'));
        }
        this.korisnik.dohvati_korisnika(this.id).subscribe((ag) => {
            if (!ag) {
                this.router.navigate(['nepostojeca_ruta']);
            }
            try {
                if (this.break)
                    return;
                this.agencija = ag;
                this.opis_za_prikaz = this.agencija.dodatno['opis'].substring(0, 100);
                if (this.opis_za_prikaz.length == this.agencija.dodatno['opis'].length)
                    this.skraceni_opis = false;
                this.ucitano++;
            }
            catch {
                console.log("aaaaa");
                this.greska = "Не постоји агенција";
                this.ucitano = 4;
                return;
            }
        });
        if (this.break)
            return;
        this.korisnik.dohvati_komentare(this.id).subscribe((komentari) => {
            if (komentari) {
                this.komentari = komentari;
                console.log(komentari);
            }
            this.ucitano++;
        });
        if (this.ulogovan) {
            this.objService.sve_za_korisnika(this.ulogovan.korisnicko_ime).subscribe((res) => {
                if (res) {
                    this.objekti = res;
                }
                this.ucitano++;
            });
        }
        else {
            this.ucitano++;
        }
        //agencija.dodatno['opis']
    }
    async posalji_zahtev() {
        const data = {
            agencija: this.agencija.korisnicko_ime,
            agencija_ime: this.agencija.dodatno['naziv'],
            klijent: this.ulogovan.korisnicko_ime,
            objekat: this.objekat,
            pocetak: this.pocetak,
            kraj: this.kraj,
            status: "Послат захтев"
        };
        if (!this.kraj || !this.objekat || !this.pocetak || this.pocetak > this.kraj) {
            this.greska = "Погрешно унети подаци!";
            return;
        }
        else {
            this.greska = null;
        }
        this.posloviService.dodaj_posao(data).subscribe(async (res) => {
            const sleep = async (milliseconds) => {
                await new Promise(resolve => {
                    return setTimeout(resolve, milliseconds);
                });
            };
            if (res['message'] == 'ok') {
                this.uspeh = "Успешно послат захтев за сарадњу! Прозор ће се затворити за: ";
                this.brojac = 5;
                setTimeout(() => {
                    this.uspeh = null;
                    this.modalZatvaranje.nativeElement.click();
                }, 5000);
                for (let i = 5; i > 0; i--) {
                    await sleep(1000);
                    this.brojac--;
                }
            }
        });
    }
};
__decorate([
    ViewChild('modalZatvaranje')
], AgencijaPrikazComponent.prototype, "modalZatvaranje", void 0);
AgencijaPrikazComponent = __decorate([
    Component({
        selector: 'app-agencija-prikaz',
        templateUrl: './agencija-prikaz.component.html',
        styleUrls: ['./agencija-prikaz.component.css']
    })
], AgencijaPrikazComponent);
export { AgencijaPrikazComponent };
//# sourceMappingURL=agencija-prikaz.component.js.map