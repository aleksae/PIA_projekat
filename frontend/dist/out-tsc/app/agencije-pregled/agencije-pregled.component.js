import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AgencijePregledComponent = class AgencijePregledComponent {
    constructor(korisnikService) {
        this.korisnikService = korisnikService;
        this.pretraga_u_toku = false;
        this.sort_naziv_rastuce = false;
        this.sort_naziv_opadajuce = false;
        this.sort_adresa_rastuce = false;
        this.sort_adresa_opadajuce = false;
        this.ucitavanje = false;
        this.opisi = [];
        this.opisi_indikator = [];
    }
    ngOnInit() {
        this.ucitavanje = true;
        this.pretraga_u_toku = false;
        this.korisnici = [];
        this.stanje = "Све агенције";
        this.korisnikService.sviKorisnici().subscribe((korisnici) => {
            this.pocetno = korisnici;
            korisnici.forEach((korisnik) => {
                if (korisnik.uloga == "agencija") {
                    this.korisnici.push(korisnik);
                    this.opisi.push(korisnik.dodatno['opis'].substring(0, 100));
                    if (korisnik.dodatno['opis'].length <= 100)
                        this.opisi_indikator.push(true);
                    else
                        this.opisi_indikator.push(false);
                }
            });
            this.pocetno = this.korisnici;
            this.ucitavanje = false;
        });
    }
    azuriraj_prikaz_opisa(i) {
        this.opisi_indikator[i] = !this.opisi_indikator[i];
        if (this.opisi_indikator[i])
            this.opisi[i] = this.korisnici[i].dodatno['opis'];
        else
            this.opisi[i] = this.korisnici[i].dodatno['opis'].substring(0, 100);
    }
    sortiraj(res) {
        switch (res) {
            case 'a_o':
                this.sort_adresa_opadajuce = !this.sort_adresa_opadajuce;
                if (this.sort_adresa_opadajuce && this.sort_adresa_rastuce)
                    this.sort_adresa_rastuce = false;
                break;
            case 'a_r':
                this.sort_adresa_rastuce = !this.sort_adresa_rastuce;
                if (this.sort_adresa_opadajuce && this.sort_adresa_rastuce)
                    this.sort_adresa_opadajuce = false;
                break;
            case 'n_o':
                this.sort_naziv_opadajuce = !this.sort_naziv_opadajuce;
                if (this.sort_naziv_opadajuce && this.sort_naziv_rastuce)
                    this.sort_naziv_rastuce = false;
                break;
            case 'n_r':
                this.sort_naziv_rastuce = !this.sort_naziv_rastuce;
                if (this.sort_naziv_opadajuce && this.sort_naziv_rastuce)
                    this.sort_naziv_opadajuce = false;
                break;
            default:
        }
        //console.log("sno "+this.sort_naziv_opadajuce+" snr "+this.sort_naziv_rastuce+" sao "+this.sort_adresa_opadajuce+" sar "+this.sort_adresa_rastuce)
        if (this.sort_adresa_opadajuce) {
            if (this.sort_naziv_opadajuce)
                this.korisnici.sort((a, b) => ((this.sort_string(b['dodatno']['adresa'], a['dodatno']['adresa'])) || (this.sort_string(b['dodatno']['naziv'], a['dodatno']['naziv']))));
            else if (this.sort_naziv_rastuce)
                this.korisnici.sort((a, b) => ((this.sort_string(b['dodatno']['adresa'], a['dodatno']['adresa'])) || (this.sort_string(a['dodatno']['naziv'], b['dodatno']['naziv']))));
            else
                this.korisnici.sort((a, b) => this.sort_string(b['dodatno']['adresa'], a['dodatno']['adresa']));
        }
        else if (this.sort_adresa_rastuce) {
            if (this.sort_naziv_opadajuce)
                this.korisnici.sort((a, b) => ((this.sort_string(a['dodatno']['adresa'], b['dodatno']['adresa'])) || (this.sort_string(b['dodatno']['naziv'], a['dodatno']['naziv']))));
            else if (this.sort_naziv_rastuce)
                this.korisnici.sort((a, b) => ((this.sort_string(a['dodatno']['adresa'], b['dodatno']['adresa'])) || (this.sort_string(a['dodatno']['naziv'], b['dodatno']['naziv']))));
            else
                this.korisnici.sort((a, b) => this.sort_string(a['dodatno']['adresa'], b['dodatno']['adresa']));
        }
        else if (this.sort_naziv_opadajuce) {
            this.korisnici.sort((a, b) => this.sort_string(b['dodatno']['naziv'], a['dodatno']['naziv']));
        }
        else if (this.sort_naziv_rastuce) {
            this.korisnici.sort((a, b) => this.sort_string(a['dodatno']['naziv'], b['dodatno']['naziv']));
        }
        else {
            this.korisnici.sort((a, b) => {
                if (this.pocetno.indexOf(a) > this.pocetno.indexOf(b))
                    return 1;
                else if (this.pocetno.indexOf(a) < this.pocetno.indexOf(b))
                    return -1;
                else
                    return 0;
            });
        }
    }
    sort_string(a, b) {
        if (a > b)
            return 1;
        else if (a < b)
            return -1;
        else
            return 0;
    }
    pretrazi_po_adresi() {
        this.pocetno.forEach((agencija) => {
            if (!(agencija.uloga == "agencija"))
                return;
            if ((agencija.dodatno["adresa"]).toLowerCase().match(this.adresa.toLowerCase()) == this.adresa.toLowerCase())
                this.korisnici.push(agencija);
        });
        this.stanje = "Резултати претраге";
    }
    pretrazi_po_nazivu() {
        this.pocetno.forEach((agencija) => {
            if (!(agencija.uloga == "agencija"))
                return;
            if (agencija.dodatno["naziv"].toLowerCase().match(this.naziv.toLowerCase()) == this.naziv.toLowerCase())
                this.korisnici.push(agencija);
        });
        this.stanje = "Резултати претраге";
    }
    pretrazi_po_oba() {
        this.korisnici = [];
        this.pocetno.forEach((agencija) => {
            if (!(agencija.uloga == "agencija"))
                return;
            if (agencija.dodatno["naziv"].toLowerCase().match(this.naziv.toLowerCase()) == this.naziv.toLowerCase()
                && (agencija.dodatno["adresa"]).toLowerCase().match(this.adresa.toLowerCase()) == this.adresa.toLowerCase())
                this.korisnici.push(agencija);
        });
        this.stanje = "Резултати претраге";
    }
    reset_adresa() {
        this.adresa = null;
        this.pretraga();
    }
    reset_naziv() {
        this.naziv = null;
        this.pretraga();
    }
    async pretraga() {
        this.stara_adresa = this.adresa;
        this.stari_naziv = this.naziv;
        this.pretraga_u_toku = true;
        this.korisnici = [];
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000);
        if (!this.naziv || this.naziv == '') {
            //nije unet naziv agencije
            if (!this.adresa || this.adresa == '') {
                //nije uneta ni adresa ni agencija
                this.ngOnInit();
                this.stanje = "Сви корисници";
            }
            else {
                this.pretrazi_po_adresi();
            }
        }
        else {
            //unet je naziv agencije
            this.pretrazi_po_nazivu();
            if (!this.adresa || this.adresa == '') {
                //nije uneta adresa, ali jeste naziv, ne radimo nista
            }
            else {
                //uneta i adresa i naziv agencije
                this.pretrazi_po_oba();
            }
        }
        this.sortiraj(null);
        this.pretraga_u_toku = false;
    }
};
AgencijePregledComponent = __decorate([
    Component({
        selector: 'app-agencije-pregled',
        templateUrl: './agencije-pregled.component.html',
        styleUrls: ['./agencije-pregled.component.css'],
    })
], AgencijePregledComponent);
export { AgencijePregledComponent };
//# sourceMappingURL=agencije-pregled.component.js.map