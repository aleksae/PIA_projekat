import { __decorate } from "tslib";
import { Component } from '@angular/core';
let KlijentPocetnaComponent = class KlijentPocetnaComponent {
    constructor(korisnikService, http, broadcastService) {
        this.korisnikService = korisnikService;
        this.http = http;
        this.broadcastService = broadcastService;
        this.img_err = false;
        this.filename_server = "";
        this.slanje_u_toku = false;
        this.postoji_mejl = false;
    }
    fileChange(element) {
        this.uploadedFiles = element.target.files;
        let event = element;
        let reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageSrc = reader.result;
            };
            let img = new Image();
            img.src = window.URL.createObjectURL(event.target.files[0]);
            img.onload = () => {
                this.img_w = img.width;
                this.img_h = img.height;
                let val = (this.img_h > 300 || this.img_h < 100 || this.img_w < 100 || this.img_w > 300);
                this.greska = val ? "слика није одговарајуће величоне" : null;
                if (val) {
                    this.imageSrc = null;
                    this.uploadedFiles = null;
                    this.img_err = true;
                }
                else {
                    this.img_err = false;
                }
            };
        }
        else {
            this.uploadedFiles = null;
            this.imageSrc = null;
        }
    }
    ngOnInit() {
        this.korisnikService.sviKorisnici().subscribe((kIzBaze) => {
            this.korisnici = kIzBaze;
        });
        this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
        this.ime = this.ulogovan.dodatno.ime;
        this.prezime = this.ulogovan.dodatno.prezime;
        this.mejl = this.ulogovan.imejl;
        this.telefon = this.ulogovan.br_telefona;
    }
    format_mejl() {
        if (this.greska)
            this.greska != null;
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl);
    }
    check() {
        if (this.greska)
            this.greska != null;
        let set_in_iter_mejl = false;
        if (!this.korisnici)
            return;
        this.korisnici.forEach((clan) => {
            if (clan.imejl == this.mejl && clan.korisnicko_ime != this.ulogovan.korisnicko_ime) {
                this.postoji_mejl = true;
                set_in_iter_mejl = true;
            }
            else if (!set_in_iter_mejl)
                this.postoji_mejl = false;
        });
        return;
    }
    obrisi_sliku() {
        this.http.get('http://localhost:4000/brisanje_slike/' + this.ulogovan.profilna_slika).subscribe((res) => {
        });
        this.korisnikService.azuriraj_klijenta(this.ulogovan.korisnicko_ime, this.ime, this.prezime, this.telefon, this.mejl, "").subscribe(respObj => {
        });
        this.azuriraj_ulogovan("");
    }
    azuriraj_ulogovan(prof) {
        this.ulogovan.dodatno['ime'] = this.ime;
        this.ulogovan.dodatno['prezime'] = this.prezime;
        this.ulogovan.br_telefona = this.telefon;
        this.ulogovan.imejl = this.mejl;
        this.ulogovan.profilna_slika = prof;
        localStorage.removeItem("klijent");
        localStorage.setItem("klijent", JSON.stringify(this.ulogovan));
        this.broadcastService.azurirajUlogovanog.next({ status: 1 });
        this.ngOnInit();
        this.uploadedFiles = null;
        this.imageSrc = null;
        setTimeout(() => {
            this.poruka_o_stanju = null;
        }, 5000);
    }
    async azuriraj() {
        if (((this.postoji_mejl) || !this.ime || !this.prezime || !this.telefon || !this.mejl || !this.format_mejl() || this.img_err)) {
            this.greska = "Неисправно унети подаци!";
            return;
        }
        this.slanje_u_toku = true;
        if (this.uploadedFiles) {
            if (this.uploadedFiles.length != 0) {
                let formData = new FormData();
                for (var i = 0; i < this.uploadedFiles.length; i++) {
                    formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
                }
                await this.http.post('http://localhost:4000/fajlovi/otpremanje', formData)
                    .subscribe(async (response) => {
                    if (this.ulogovan.profilna_slika != '')
                        await this.http.get('http://localhost:4000/brisanje_slike/' + this.ulogovan.profilna_slika).subscribe();
                    this.filename_server = response.fileName;
                    this.korisnikService.azuriraj_klijenta(this.ulogovan.korisnicko_ime, this.ime, this.prezime, this.telefon, this.mejl, this.filename_server).subscribe(async (respObj) => {
                        if (respObj['message'] == "ok") {
                            window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                            this.slanje_u_toku = false;
                            this.poruka_o_stanju = "Подаци успешно ажурирани";
                            this.azuriraj_ulogovan(this.filename_server);
                        }
                    });
                });
            }
            else {
                this.korisnikService.azuriraj_klijenta(this.ulogovan.korisnicko_ime, this.ime, this.prezime, this.telefon, this.mejl, this.ulogovan.profilna_slika).subscribe(async (respObj) => {
                    if (respObj['message'] == "ok") {
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                        this.slanje_u_toku = false;
                        this.poruka_o_stanju = "Подаци успешно ажурирани";
                        this.azuriraj_ulogovan(this.ulogovan.profilna_slika);
                    }
                    else {
                    }
                });
            }
        }
        else {
            this.korisnikService.azuriraj_klijenta(this.ulogovan.korisnicko_ime, this.ime, this.prezime, this.telefon, this.mejl, this.ulogovan.profilna_slika).subscribe(async (respObj) => {
                if (respObj['message'] == "ok") {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    this.slanje_u_toku = false;
                    this.poruka_o_stanju = "Подаци успешно ажурирани";
                    this.azuriraj_ulogovan(this.ulogovan.profilna_slika);
                }
            });
        }
    }
};
KlijentPocetnaComponent = __decorate([
    Component({
        selector: 'app-klijent-pocetna',
        templateUrl: './klijent-pocetna.component.html',
        styleUrls: ['./klijent-pocetna.component.css']
    })
], KlijentPocetnaComponent);
export { KlijentPocetnaComponent };
//# sourceMappingURL=klijent-pocetna.component.js.map