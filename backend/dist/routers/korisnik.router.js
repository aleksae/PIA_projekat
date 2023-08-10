"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/prijava').post((req, res) => new korisnik_controller_1.KorisnikController().prijava(req, res));
korisnikRouter.route('/registracija').post((req, res) => {
    console.log("registracijaaaaaaaaa");
    new korisnik_controller_1.KorisnikController().registracija(req, res);
});
korisnikRouter.route('/svi_korisnici').get((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiSve(req, res);
});
korisnikRouter.route('/svi_korisnici').get((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiSve(req, res);
});
korisnikRouter.route('/promena_lozinke').post((req, res) => {
    new korisnik_controller_1.KorisnikController().promena_lozinke(req, res);
});
korisnikRouter.route('/azuriraj_klijenta').post((req, res) => {
    new korisnik_controller_1.KorisnikController().azuriraj_klijenta(req, res);
});
korisnikRouter.route('/komentari_za_agenciju').post((req, res) => {
    new korisnik_controller_1.KorisnikController().komentari_za_agenciju(req, res);
});
korisnikRouter.route('/komentari_za_klijenta').post((req, res) => {
    new korisnik_controller_1.KorisnikController().komentari_za_klijenta(req, res);
});
korisnikRouter.route('/dohvati_korisnika').post((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvati_korisnika(req, res);
});
korisnikRouter.route('/dodaj_komentar').post((req, res) => {
    new korisnik_controller_1.KorisnikController().dodaj_komentar(req, res);
});
korisnikRouter.route('/uredi_komentar').post((req, res) => {
    new korisnik_controller_1.KorisnikController().uredi_komentar(req, res);
});
korisnikRouter.route('/obrisi_komentar').post((req, res) => {
    new korisnik_controller_1.KorisnikController().obrisi_komentar(req, res);
});
korisnikRouter.route('/odobrenost').post((req, res) => {
    new korisnik_controller_1.KorisnikController().odobrenost(req, res);
});
korisnikRouter.route('/obrisi').post((req, res) => {
    new korisnik_controller_1.KorisnikController().obrisi(req, res);
});
korisnikRouter.route('/prikaz_slike/:id').get((req, res) => {
    const fs = require('fs');
    console.log(req.params.id);
    try {
        fs.readFile('public/' + req.params.id, function (err, data) {
            if (err)
                throw err;
            else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    }
    catch (_a) {
        console.log("Doslo je do greske prilikom ucitavanja slike");
        res.status(400);
    }
});
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.router.js.map