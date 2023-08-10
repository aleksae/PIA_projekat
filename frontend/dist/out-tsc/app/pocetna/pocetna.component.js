import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PocetnaComponent = class PocetnaComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        if (JSON.parse(localStorage.getItem("klijent"))) {
            this.route.navigate(["klijent/profil"]);
        }
        else if (JSON.parse(localStorage.getItem("agencija"))) {
            this.route.navigate(["agencija/profil"]);
        }
    }
};
PocetnaComponent = __decorate([
    Component({
        selector: 'app-pocetna',
        templateUrl: './pocetna.component.html',
        styleUrls: ['./pocetna.component.css']
    })
], PocetnaComponent);
export { PocetnaComponent };
//# sourceMappingURL=pocetna.component.js.map