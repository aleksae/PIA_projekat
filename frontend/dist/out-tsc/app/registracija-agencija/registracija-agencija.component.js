import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as sha512 from 'js-sha512';
let RegistracijaAgencijaComponent = class RegistracijaAgencijaComponent {
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
    }
    async upload() {
    }
    constructor(korisnikService, router, http) {
        this.korisnikService = korisnikService;
        this.router = router;
        this.http = http;
        this.img_err = false;
        this.filename_server = "";
        this.slanje_u_toku = false;
        this.postoji_k_ime = false;
        this.postoji_mejl = false;
        this.lozinka_7 = true;
        this.lozinka_12 = true;
        this.lozinka_vs = true;
        this.lozinka_broj = true;
        this.lozinka_sk = true;
        this.lozinka_pocinje_slovom = true;
        this.lozinke_iste = true;
    }
    ngOnInit() {
        this.korisnikService.sviKorisnici().subscribe((kIzBaze) => {
            this.korisnici = kIzBaze;
        });
        //fu
    }
    check() {
        let set_in_iter = false;
        let set_in_iter_mejl = false;
        if (!this.korisnici)
            return;
        this.korisnici.forEach((clan) => {
            if (clan.korisnicko_ime == this.k_ime) {
                this.postoji_k_ime = true;
                set_in_iter = true;
            }
            else if (!set_in_iter)
                this.postoji_k_ime = false;
            if (clan.imejl == this.mejl) {
                this.postoji_mejl = true;
                set_in_iter_mejl = true;
            }
            else if (!set_in_iter_mejl)
                this.postoji_mejl = false;
        });
        return;
    }
    format_mejl() {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl);
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
    async registracija() {
        const sleep = async (milliseconds) => {
            await new Promise(resolve => {
                return setTimeout(resolve, milliseconds);
            });
        };
        const testSleep = async () => {
            this.odbrojavanje = 5;
            for (let i = 5; i > 0; i--) {
                await sleep(1000);
                this.odbrojavanje = i - 1;
            }
            console.log("The loop is finished :)");
        };
        const dodatno = {
            adresa: this.adresa,
            maticni_broj: this.maticni,
            opis: this.opis,
            naziv: this.ime
        };
        if (!(!this.postoji_k_ime && !this.postoji_mejl) || !(this.lozinka_7 && this.lozinka_12 && this.lozinka_broj && this.lozinka_pocinje_slovom && this.lozinka_sk && this.lozinka_vs) || !(this.lozinke_iste) || !this.ime || !this.adresa || !this.maticni || !this.opis || !this.telefon || !this.mejl || !this.k_ime || !this.lozinka || !this.lozinka_opet || !this.format_mejl() || this.img_err) {
            this.greska = "Неисправно унети подаци! Вредност описа је " + this.opis;
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
                    .subscribe((response) => {
                    this.filename_server = response.fileName;
                    this.korisnikService.registracija(this.k_ime, sha512.sha512(this.lozinka), this.telefon, this.mejl, this.filename_server, dodatno, "agencija").subscribe(async (respObj) => {
                        if (respObj['message'] == "ok") {
                            window.scroll({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                            this.slanje_u_toku = false;
                            this.poruka_o_stanju = "Регистрација је успешно обављена, моћи ћете да се улогујете након што администратор потврди ваш налог.";
                            await testSleep();
                            this.poruka_o_stanju = null;
                            this.router.navigate(['']);
                        }
                    });
                });
            }
            else {
                console.log(this.filename_server);
                this.korisnikService.registracija(this.k_ime, sha512.sha512(this.lozinka), this.telefon, this.mejl, this.filename_server, dodatno, "agencija").subscribe(async (respObj) => {
                    if (respObj['message'] == "ok") {
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                        this.slanje_u_toku = false;
                        this.poruka_o_stanju = "Регистрација је успешно обављена, моћи ћете да се улогујете након што администратор потврди ваш налог.";
                        await testSleep();
                        this.poruka_o_stanju = null;
                        this.router.navigate(['']);
                    }
                });
            }
        }
        else {
            console.log(this.filename_server);
            this.korisnikService.registracija(this.k_ime, sha512.sha512(this.lozinka), this.telefon, this.mejl, this.filename_server, dodatno, "agencija").subscribe(async (respObj) => {
                if (respObj['message'] == "ok") {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    this.slanje_u_toku = false;
                    this.poruka_o_stanju = "Регистрација је успешно обављена, моћи ћете да се улогујете након што администратор потврди ваш налог.";
                    await testSleep();
                    this.poruka_o_stanju = null;
                    this.router.navigate(['']);
                }
            });
        }
    }
};
RegistracijaAgencijaComponent = __decorate([
    Component({
        selector: 'app-registracija-agencija',
        templateUrl: './registracija-agencija.component.html',
        styleUrls: ['./registracija-agencija.component.css']
    })
], RegistracijaAgencijaComponent);
export { RegistracijaAgencijaComponent };
//# sourceMappingURL=registracija-agencija.component.js.map