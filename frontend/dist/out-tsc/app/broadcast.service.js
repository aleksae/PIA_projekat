import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let BroadcastService = class BroadcastService {
    constructor() {
        /**
         * status table
         * 1 - azuriran klijent
         */
        this.azurirajUlogovanog = new Subject();
        this.porukaOStatusu = new Subject();
    }
};
BroadcastService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BroadcastService);
export { BroadcastService };
//# sourceMappingURL=broadcast.service.js.map