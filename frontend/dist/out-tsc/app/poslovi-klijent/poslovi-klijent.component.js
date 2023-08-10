import { __decorate } from "tslib";
import { Component, ViewChildren, HostListener } from '@angular/core';
let PosloviKlijentComponent = class PosloviKlijentComponent {
    constructor(posloviService, objService, cdRef) {
        this.posloviService = posloviService;
        this.objService = objService;
        this.cdRef = cdRef;
        this.objekti = [];
        this.ulogovan = JSON.parse(localStorage.getItem('klijent'));
        this.prozor_s = null;
        this.prozor_v = null;
        this.setovan = false;
        this.prostorije = [];
        this.vrata = [];
        this.konteksti = [];
        this.poslovi = [];
        this.br_kred_kartice = "";
        this.zahtevi_za_otkazivanjem = [];
        this.zahtevi_za_otkazivanjem_detalji = [];
        this.gotovo = false;
        this.aktivni_filter = false;
        this.zavrseni_filter = false;
        this.zahtevi_filter = false;
        this.poslovi_original = [];
        this.razlog = "";
    }
    ngOnInit() {
        this.posloviService.dohvati_sve_za_klijenta(this.ulogovan.korisnicko_ime).subscribe((res) => {
            this.poslovi = res;
            this.poslovi_original = res;
            if (this.poslovi.length == 0) {
                this.gotovo = true;
                this.setovan = true;
                return;
            }
            for (let i = 0; i < this.poslovi.length; i++) {
                this.objService.dohvati_objekat(this.poslovi[i].objekat).subscribe((res) => {
                    if (res) {
                        this.objekti.push(res);
                    }
                    this.posloviService.dohvati_zahtev_za_otkazivanjem(this.poslovi[i]._id).subscribe((res) => {
                        let prom = this.poslovi[i]._id;
                        if (res.length) {
                            let obj1 = {};
                            obj1[prom] = true;
                            let obj2 = {};
                            obj2[prom] = res[0];
                            this.zahtevi_za_otkazivanjem.push(obj1);
                            this.zahtevi_za_otkazivanjem_detalji.push(obj2);
                            console.log(this.zahtevi_za_otkazivanjem);
                        }
                        else
                            this.zahtevi_za_otkazivanjem.push({ prom: false });
                        //console.log(res)
                        if ((this.poslovi.length - 1) == i) {
                            //console.log(this.zahtevi_za_otkazivanjem)
                            this.inicijalizuj();
                            console.log("aleksa");
                            this.gotovo = true;
                            this.setovan = true;
                            setTimeout(() => {
                                this.ngAfterViewInit();
                            }, 0);
                        }
                    });
                });
            }
        });
    }
    zahtev_za_otkazivanjem(id) {
        for (let n of this.zahtevi_za_otkazivanjem) {
            if (n[id]) {
                return true;
            }
        }
        return false;
    }
    dohvati_detalje_zahteva(id) {
        console.log("pozvan");
        for (let n of this.zahtevi_za_otkazivanjem_detalji) {
            console.log(n);
            if (n[id]) {
                return n[id];
            }
        }
        return null;
    }
    listner_action() {
        try {
            this.cdRef.detectChanges();
            this.prozor_s = window.innerWidth;
            this.prozor_v = window.innerHeight;
            this.konteksti = [];
            for (let i = 0; i < this.canvasi.length; i++) {
                console.log(this.canvasi.get(i));
                this.konteksti.push(this.canvasi.get(i).nativeElement.getContext('2d'));
            }
            this.iscrtaj();
        }
        catch {
        }
    }
    onResize(event) {
        this.cdRef.detectChanges();
        setTimeout(() => {
            this.prozor_s = window.innerWidth;
            this.prozor_v = window.innerHeight;
            /*for(let i=0; i<this.canvasi.length; i++){
          
              this.canvasi.get(i).nativeElement.width = (this.prozor_s<769) ? 285 :((this.prozor_s<993) ? 400 : 600)
              this.canvasi.get(i).nativeElement.height = (this.prozor_s<769) ? 178 :((this.prozor_s<993) ? 250 : 350)
              //this.objekti[i].sirina_kanvasa = (this.prozor_s<429) ? 285 :((this.prozor_s<717) ? 400 : 600)
            }
            //this.skaliranje()
            this.iscrtaj()
            for(let i=0; i<this.canvasi.length; i++){
              this.objekti[i].sirina_kanvasa = (this.prozor_s<769) ? 285 :((this.prozor_s<993) ? 400 : 600)
            }*/
        }, 1);
    }
    inicijalizuj() {
        for (let i = 0; i < this.objekti.length; i++) {
            this.prostorije.push(this.objekti[i][0].prostorije);
            let temp = [];
            for (let j = 0; j < this.objekti[i][0].prostorije.length; j++) {
                for (let k = 0; k < this.objekti[i][0].prostorije[j].vrata.length; k++)
                    temp.push(this.objekti[i][0].prostorije[j].vrata[k]);
            }
            this.vrata.push(temp);
        }
    }
    kreditna_err() {
        if (this.br_kred_kartice.length > 19) {
            return false;
        }
        else
            return true;
    }
    kreditna_input() {
        this.br_kred_kartice = this.br_kred_kartice.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    ngAfterViewInit() {
        if (this.setovan) {
            console.log(this.canvasi.length);
            for (let i = 0; i < this.canvasi.length; i++) {
                console.log(this.canvasi.get(i));
                this.konteksti.push(this.canvasi.get(i).nativeElement.getContext('2d'));
            }
            //this.skaliranje()
            this.iscrtaj();
        }
        //while(!this.setovan) {}
    }
    iscrtaj() {
        console.log("pozvan uz br obj " + this.objekti.length);
        for (let i = 0; i < this.objekti.length; i++) {
            console.log("imamo nesto 1");
            this.konteksti[i].clearRect(0, 0, this.canvasi.get(i).nativeElement.width, this.canvasi.get(i).nativeElement.height);
            let j = 0;
            for (let m = 0; m < this.prostorije[i].length; m++) {
                console.log("imamo nesto 2");
                let p = this.prostorije[i][m];
                if (p['postavljeno']) {
                    console.log("imamo nesto 3");
                    this.konteksti[i].fillStyle = p.boja_popuna;
                    this.konteksti[i].strokeStyle = p.boja_okvir;
                    this.konteksti[i].strokeRect(p['pozicija_x'], p['pozicija_y'], p['sirina'], p['visina']);
                    this.konteksti[i].font = "20px Georgia";
                    this.konteksti[i].textAlign = "center";
                    this.konteksti[i].textBaseline = "middle";
                    this.konteksti[i].fillStyle = "#000000";
                    this.konteksti[i].fillText((j + 1) + "", p['pozicija_x'] + (p['sirina'] / 2), p['pozicija_y'] + (p['visina'] / 2));
                }
                else {
                }
                j++;
            }
            for (let k = 0; k < this.vrata[i].length; k++) {
                this.iscrtaj_svg(i, k);
            }
        }
    }
    iscrtaj_svg(j, i) {
        //console.log("j je "+j+" a i je "+i)
        let old_s = this.objekti[j].sirina_kanvasa;
        this.konteksti[j].save();
        this.konteksti[j].fillStyle = this.vrata[j][i].boja;
        this.konteksti[j].beginPath();
        let p = new Path2D("M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z");
        this.konteksti[j].translate(this.vrata[j][i].pozicija_x + (this.vrata[j][i].strana == 1 || this.vrata[j][i].strana == 4 ? 16 : (this.vrata[j][i].strana == 3 ? -16 : 0)), this.vrata[j][i].pozicija_y - (this.vrata[j][i].strana == 3 || this.vrata[j][i].strana == 4 ? -16 : 16));
        let ugao = 0;
        switch (this.vrata[j][i].strana) {
            case 1:
                ugao = 90 * Math.PI / 180;
                break;
            case 2:
                ugao = 0;
                break;
            case 3:
                ugao = -90 * Math.PI / 180;
                break;
            case 4:
                ugao = 180 * Math.PI / 180;
                break;
        }
        this.konteksti[j].rotate(ugao);
        this.konteksti[j].fill(p);
        /*if(old_s==600 && this.canvasi.get(j).nativeElement.width == 400 || old_s==400 && this.canvasi.get(j).nativeElement.width==285){
          console.log("skalirano")
          this.konteksti[j].scale(0.6667,0.7142)
        }else if(old_s==600 && this.canvasi.get(j).nativeElement.width ==285){
          this.konteksti[j].scale(0.6667*0.6667,0.7142*0.7142)
        }else if(old_s==400 && this.canvasi.get(j).nativeElement.width == 600 || old_s==285 && this.canvasi.get(j).nativeElement.width==400){
          this.konteksti[j].scale(1.5,1.4)
        }else{
          this.konteksti[j].scale(2.2497,1.96)
        }*/
        this.konteksti[j].closePath();
        this.konteksti[j].restore();
    }
    otkazi(id) {
        if (this.razlog == "") {
            console.log(this.razlog + " je razlog");
            return;
        }
        this.gotovo = false;
        const data = {
            posao: id,
            klijent: this.ulogovan.korisnicko_ime,
            razlog: this.razlog,
            status: "Послат"
        };
        this.posloviService.zahtev_za_otkazivanjem(data).subscribe((res) => {
            if (res['message'] == 'ok') {
                this.gotovo = true;
                let obj1 = {};
                obj1[id] = true;
                let obj2 = {};
                obj2[id] = data;
                this.zahtevi_za_otkazivanjem.push(obj1);
                this.zahtevi_za_otkazivanjem_detalji.push(obj2);
            }
            else {
                this.gotovo = true;
            }
        });
    }
    filtriraj() {
        console.log("pozvan filtriraj");
        let niz = [];
        for (let i = 0; i < this.poslovi_original.length; i++) {
            let p = this.poslovi_original[i];
            if (!this.aktivni_filter && !this.zavrseni_filter && !this.zahtevi_filter) {
                this.poslovi = this.poslovi_original;
                this.listner_action();
                //this.iscrtaj()
                //this.ngAfterViewInit()
                return;
            }
            if ((p.status == "Активан") && this.aktivni_filter) {
                niz.push(p);
            }
            if ((p.status == "Завршен") && this.zavrseni_filter) {
                niz.push(p);
            }
            if ((p.status == "Послат захтев" || p.status == "Прихваћен" || p.status == "Спреман за плаћање") && this.zahtevi_filter) {
                niz.push(p);
            }
        }
        this.poslovi = niz;
        this.listner_action();
        //this.ngAfterViewInit()
        //this.iscrtaj()
    }
    filtriraj_aktivni() {
        this.aktivni_filter = !this.aktivni_filter;
        this.filtriraj();
    }
    filtriraj_zavrseni() {
        this.zavrseni_filter = !this.zavrseni_filter;
        this.filtriraj();
    }
    filtriraj_zahtevi() {
        this.zahtevi_filter = !this.zahtevi_filter;
        this.filtriraj();
    }
};
__decorate([
    ViewChildren('skica_objekta')
], PosloviKlijentComponent.prototype, "canvasi", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], PosloviKlijentComponent.prototype, "onResize", null);
PosloviKlijentComponent = __decorate([
    Component({
        selector: 'app-poslovi-klijent',
        templateUrl: './poslovi-klijent.component.html',
        styleUrls: ['./poslovi-klijent.component.css']
    })
], PosloviKlijentComponent);
export { PosloviKlijentComponent };
//# sourceMappingURL=poslovi-klijent.component.js.map