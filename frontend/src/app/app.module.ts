import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegistracijaKlijenataComponent } from './registracija-klijenata/registracija-klijenata.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { KlijentPocetnaComponent } from './klijent-pocetna/klijent-pocetna.component';
import { AgencijaPocetnaComponent } from './agencija-pocetna/agencija-pocetna.component';
import { HeaderComponent } from './header/header.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { ResetovanjeLozinkeComponent } from './resetovanje-lozinke/resetovanje-lozinke.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaAgencijaComponent } from './registracija-agencija/registracija-agencija.component';
import { AgencijePregledComponent } from './agencije-pregled/agencije-pregled.component';
import { LoaderComponent } from './loader/loader.component';
import {MatSelectModule} from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KreiranjeObjektaComponent } from './kreiranje-objekta/kreiranje-objekta.component';
import { NematePristupComponent } from './nemate-pristup/nemate-pristup.component';
import { PregledObjekataKlijentComponent } from './pregled-objekata-klijent/pregled-objekata-klijent.component';
import { AgencijaPrikazComponent } from './agencija-prikaz/agencija-prikaz.component';
import { PosloviKlijentComponent } from './poslovi-klijent/poslovi-klijent.component';
import { AgencijaProfilComponent } from './agencija-profil/agencija-profil.component';
import { AgencijaPosloviComponent } from './agencija-poslovi/agencija-poslovi.component';
import { AgencijaRadniciComponent } from './agencija-radnici/agencija-radnici.component';
import { NijePronadjenoComponent } from './nije-pronadjeno/nije-pronadjeno.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminKorisniciComponent } from './admin-korisnici/admin-korisnici.component';
import { AdminRadniciComponent } from './admin-radnici/admin-radnici.component';
import { AdminPosloviComponent } from './admin-poslovi/admin-poslovi.component';
import { ObjekatJsonComponent } from './objekat-json/objekat-json.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    RegistracijaKlijenataComponent,
    PrijavaComponent,
    KlijentPocetnaComponent,
    AgencijaPocetnaComponent,
    HeaderComponent,
    ZaboravljenaLozinkaComponent,
    ResetovanjeLozinkeComponent,
    PromenaLozinkeComponent,
    RegistracijaAgencijaComponent,
    AgencijePregledComponent,
    LoaderComponent,
    KreiranjeObjektaComponent,
    NematePristupComponent,
    PregledObjekataKlijentComponent,
    AgencijaPrikazComponent,
    PosloviKlijentComponent,
    AgencijaProfilComponent,
    AgencijaPosloviComponent,
    AgencijaRadniciComponent,
    NijePronadjenoComponent,
    AdminLoginComponent,
    AdminPocetnaComponent,
    AdminKorisniciComponent,
    AdminRadniciComponent,
    AdminPosloviComponent,
    ObjekatJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
