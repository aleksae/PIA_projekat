import { __decorate } from "tslib";
import { Component, HostListener } from '@angular/core';
let NijePronadjenoComponent = class NijePronadjenoComponent {
    constructor() {
        this.mobilni = false;
        this.vid = 0;
        this.prikazi_div = false;
        this.slucajan_broj = 0.64;
    }
    ngOnInit() {
        if (window.innerWidth <= 1000) {
            this.mobilni = true;
        }
    }
    onResize(event) {
        if (window.innerWidth <= 1000) {
            this.mobilni = true;
        }
        else {
            this.mobilni = false;
        }
    }
    prikazi() {
        this.prikazi_div = true;
        this.slucajan_broj = Math.random();
    }
    videoGotov() {
        this.prikazi_div = false;
    }
    tip() {
        return this.slucajan_broj < 0.75 ? '_orig' : '';
    }
};
__decorate([
    HostListener('window:resize', ['$event'])
], NijePronadjenoComponent.prototype, "onResize", null);
NijePronadjenoComponent = __decorate([
    Component({
        selector: 'app-nije-pronadjeno',
        templateUrl: './nije-pronadjeno.component.html',
        styleUrls: ['./nije-pronadjeno.component.css']
    })
], NijePronadjenoComponent);
export { NijePronadjenoComponent };
//# sourceMappingURL=nije-pronadjeno.component.js.map