import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AgencijaPosloviComponent = class AgencijaPosloviComponent {
    constructor(posloviService) {
        this.posloviService = posloviService;
        this.ulogovan = null;
    }
    ngOnInit() {
        this.ulogovan = JSON.parse(localStorage.getItem("agencija"));
        this.posloviService.dohvati_sve_za_agenciju(this.ulogovan.korisnicko_ime).subscribe((res) => {
            if (res) {
                this.poslovi = res;
            }
        });
    }
};
AgencijaPosloviComponent = __decorate([
    Component({
        selector: 'app-agencija-poslovi',
        templateUrl: './agencija-poslovi.component.html',
        styleUrls: ['./agencija-poslovi.component.css']
    })
], AgencijaPosloviComponent);
export { AgencijaPosloviComponent };
//# sourceMappingURL=agencija-poslovi.component.js.map