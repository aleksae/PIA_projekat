import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as sha512 from 'js-sha512';
let PrijavaComponent = class PrijavaComponent {
    constructor(prijavljivanjeService, router) {
        this.prijavljivanjeService = prijavljivanjeService;
        this.router = router;
    }
    ngOnInit() {
    }
    prijava() {
        this.prijavljivanjeService.prijava(this.k_ime, sha512.sha512(this.lozinka)).subscribe((kIzBaze) => {
            if (kIzBaze != null) {
                if (kIzBaze.odobren == false) {
                    this.poruka = "Налог још увек није одобрен";
                }
                else if (kIzBaze.uloga == "klijent") {
                    localStorage.setItem("klijent", JSON.stringify(kIzBaze, function replacer(key, value) {
                        if (key === "lozinka" || key === "_id")
                            return undefined;
                        return value;
                    }));
                    this.router.navigate(['klijent/profil']);
                }
                else {
                    localStorage.setItem("agencija", JSON.stringify(kIzBaze, function replacer(key, value) {
                        if (key === "lozinka" || key === "_id")
                            return undefined;
                        return value;
                    }));
                    this.router.navigate(['agencija/profil']);
                }
            }
            else {
                this.poruka = 'Не постоје подаци за датог корисника';
            }
        });
    }
};
PrijavaComponent = __decorate([
    Component({
        selector: 'app-prijava',
        templateUrl: './prijava.component.html',
        styleUrls: ['./prijava.component.css']
    })
], PrijavaComponent);
export { PrijavaComponent };
//# sourceMappingURL=prijava.component.js.map