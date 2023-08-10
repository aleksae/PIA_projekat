import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let KlijentGuard = class KlijentGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(route, state) {
        if (route.data['uloga'] == "sve") {
            if (localStorage.getItem("klijent") || localStorage.getItem("agencija")) {
                return true;
            }
        }
        if (localStorage.getItem(route.data['uloga'])) {
            return true;
        }
        return this.router.navigate(['prava_pristupa_prestup']);
    }
};
KlijentGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], KlijentGuard);
export { KlijentGuard };
//# sourceMappingURL=klijent.guard.js.map