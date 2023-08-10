"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const korisnik_2 = __importDefault(require("../models/korisnik"));
const komentar_1 = __importDefault(require("../models/komentar"));
const privremeni_link_1 = __importDefault(require("../models/privremeni_link"));
class KorisnikController {
    constructor() {
        this.odobrenost = (req, res) => {
            /*korisnik.updateOne({'korisnicko_ime':req.body.korisnicko_ime}, {$set:{'odobren':req.body.odobren, 'odbijen':req.body.odbijen}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({'message':'ok'})
            })*/
            const fs = require('fs');
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
        };
        this.prijava = (req, rest) => {
            let k_ime = req.body.korisnicko_ime;
            let lozinka_hash = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnicko_ime': k_ime, "lozinka": lozinka_hash }, (err, korisnik) => {
                if (err)
                    rest.json({ "message": err });
                else
                    rest.json(korisnik);
            });
        };
        this.azuriraj_klijenta = (req, res) => {
            korisnik_2.default.updateOne({ 'korisnicko_ime': req.body.korisnicko_ime }, { $set: { dodatno: req.body.dodatno, 'imejl': req.body.imejl, br_telefona: req.body.br_telefona, profilna_slika: req.body.profilna_slika } }, (err, uspeh) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.registracija = (req, res) => {
            let user = new korisnik_2.default({
                korisnicko_ime: req.body.korisnicko_ime,
                lozinka: req.body.lozinka,
                br_telefona: req.body.br_telefona,
                imejl: req.body.imejl,
                uloga: req.body.uloga,
                dodatno: req.body.dodatno,
                profilna_slika: req.body.profilna_slika,
                odobren: req.body.odobren,
                odbijen: req.body.odbijen
            });
            //ako se isto zovu, let user = new UserModel(req.body)
            user.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvatiSve = (req, res) => {
            korisnik_1.default.find({}, (err, korisnici) => {
                if (err)
                    res.json({ 'message': err });
                else
                    res.json(korisnici);
            });
        };
        this.promena_lozinke = (req, res) => {
            korisnik_2.default.updateOne({ 'imejl': req.body.mejl }, { $set: { 'lozinka': req.body.lozinka } }, (err, kor) => {
                if (err)
                    res.json({ 'message': 'err' });
                else {
                    if (req.body.token != -1) {
                        privremeni_link_1.default.deleteOne({ 'token': req.body.token }, (err, result) => {
                            if (err)
                                res.json({ 'message': 'err' });
                        });
                    }
                    res.json({ 'message': 'updated' });
                }
            });
        };
        this.dodaj_komentar = (req, res) => {
            let kom = new komentar_1.default(req.body);
            kom.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.uredi_komentar = (req, res) => {
            komentar_1.default.deleteOne({ '_id': req.body.id }, (err, resp) => {
                let kom = new komentar_1.default(req.body);
                kom.save((err, resp) => {
                    if (err) {
                        res.status(400).json({ "message": "err" });
                    }
                    else
                        res.json({ "message": "ok" });
                });
            });
        };
        this.obrisi_komentar = (req, res) => {
            komentar_1.default.deleteOne({ '_id': req.body._id }, (err, resp) => {
                let kom = new komentar_1.default(req.body);
                if (err)
                    res.status(400).json({ "message": "err" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.komentari_za_agenciju = (req, res) => {
            komentar_1.default.find({ 'agencija': req.body.id }, (err, resp) => {
                if (err)
                    res.json({ 'message': err });
                else
                    res.json(resp);
            });
        };
        this.komentari_za_klijenta = (req, res) => {
            komentar_1.default.find({ 'klijent': req.body.id }, (err, resp) => {
                if (err)
                    res.json({ 'message': err });
                else
                    res.json(resp);
            });
        };
        this.dohvati_korisnika = (req, res) => {
            korisnik_2.default.findOne({ 'korisnicko_ime': req.body.id }, (err, resp) => {
                if (err)
                    res.json({ 'message': err });
                else
                    res.json(resp);
            });
        };
        this.obrisi = (req, res) => {
            korisnik_2.default.deleteOne({ 'korisnicko_ime': req.body.korisnicko_ime }, (err, resp) => {
                if (err)
                    res.json({ 'message': err });
                else
                    res.json(resp);
            });
        };
        this.dohvati_sliku = (req, res) => {
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map