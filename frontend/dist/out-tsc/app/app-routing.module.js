import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaKlijenataComponent } from './registracija-klijenata/registracija-klijenata.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { KlijentPocetnaComponent } from './klijent-pocetna/klijent-pocetna.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { ResetovanjeLozinkeComponent } from './resetovanje-lozinke/resetovanje-lozinke.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaAgencijaComponent } from './registracija-agencija/registracija-agencija.component';
import { AgencijePregledComponent } from './agencije-pregled/agencije-pregled.component';
import { KreiranjeObjektaComponent } from './kreiranje-objekta/kreiranje-objekta.component';
import { NematePristupComponent } from './nemate-pristup/nemate-pristup.component';
import { KlijentGuard } from './klijent.guard';
import { PregledObjekataKlijentComponent } from './pregled-objekata-klijent/pregled-objekata-klijent.component';
import { AgencijaPrikazComponent } from './agencija-prikaz/agencija-prikaz.component';
import { PosloviKlijentComponent } from './poslovi-klijent/poslovi-klijent.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { NijePronadjenoComponent } from './nije-pronadjeno/nije-pronadjeno.component';
import { AgencijaRadniciComponent } from './agencija-radnici/agencija-radnici.component';
const routes = [
    { path: '', component: PocetnaComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'promena_lozinke', component: PromenaLozinkeComponent, canActivate: [KlijentGuard], data: { 'uloga': 'sve' } },
    { path: 'zaboravljena_lozinka', component: ZaboravljenaLozinkaComponent },
    { path: 'klijent/profil', component: KlijentPocetnaComponent, canActivate: [KlijentGuard], data: { 'uloga': 'klijent' } },
    { path: 'registracija/klijent', component: RegistracijaKlijenataComponent },
    { path: 'registracija/agencija', component: RegistracijaAgencijaComponent },
    { path: 'resetovanje_lozinke/:id', component: ResetovanjeLozinkeComponent },
    { path: 'pregled_agencija', component: AgencijePregledComponent },
    { path: 'klijent/objekti/kreiranje', component: KreiranjeObjektaComponent, canActivate: [KlijentGuard], data: { 'uloga': 'klijent' } },
    { path: 'prava_pristupa_prestup', component: NematePristupComponent },
    { path: 'klijent/objekti/pregled', component: PregledObjekataKlijentComponent, canActivate: [KlijentGuard], data: { 'uloga': 'klijent' } },
    { path: 'klijent/poslovi/pregled', component: PosloviKlijentComponent, canActivate: [KlijentGuard], data: { 'uloga': 'klijent' } },
    { path: 'pregled_agencija/:id', component: AgencijaPrikazComponent },
    { path: 'agencija/profil', component: AgencijaProfilComponent, canActivate: [KlijentGuard], data: { 'uloga': 'agencija' } },
    { path: 'agencija/radnici', component: AgencijaRadniciComponent, canActivate: [KlijentGuard], data: { 'uloga': 'agencija' } },
    { path: '**', pathMatch: 'full', component: NijePronadjenoComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map