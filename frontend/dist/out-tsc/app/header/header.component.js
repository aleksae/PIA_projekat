import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart } from '@angular/router';
let HeaderComponent = class HeaderComponent {
    constructor(router, url, broadcastService) {
        this.router = router;
        this.url = url;
        this.broadcastService = broadcastService;
        this.aktivan = null;
    }
    ngOnInit() {
        this.router.events.subscribe((val) => {
            if (val.url) {
                this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
            }
        });
        this.broadcastService.azurirajUlogovanog.subscribe((msg) => {
            if (msg['status'] == 1)
                this.ulogovan = JSON.parse(localStorage.getItem("klijent")) || JSON.parse(localStorage.getItem("agencija"));
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                // Show progress spinner or progress bar
                if (this.url.path().includes('/objekti') || this.url.path().includes('radnici')) {
                    this.aktivan = 2;
                }
                else if (this.url.path().includes('/profil')) {
                    this.aktivan = 1;
                }
                else if (this.url.path().includes('pregled_agencija')) {
                    this.aktivan = 3;
                }
                else if (this.url.path().includes('poslovi')) {
                    this.aktivan = 4;
                }
            }
            if (event instanceof NavigationEnd) {
                // Hide progress spinner or progress bar
                if (this.url.path().includes('/objekti')) {
                    this.aktivan = 2;
                }
                else if (this.url.path().includes('/profil')) {
                    this.aktivan = 1;
                }
                else if (this.url.path().includes('agenc')) {
                    this.aktivan = 3;
                }
                else if (this.url.path().includes('poslovi')) {
                    this.aktivan = 4;
                }
            }
        });
    }
    ngAfterViewInit() {
        if (this.url.path().includes('/objekti')) {
            this.aktivan = 2;
        }
        else if (this.url.path().includes('/profil')) {
            this.aktivan = 1;
        }
    }
    odjava() {
        localStorage.removeItem("klijent");
        localStorage.removeItem("agencija");
        this.router.navigate([""]);
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map