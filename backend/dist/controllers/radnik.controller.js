"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadnikController = void 0;
const radnik_1 = __importDefault(require("../models/radnik"));
const zahtev_radna_mesta_1 = __importDefault(require("../models/zahtev-radna-mesta"));
class RadnikController {
    constructor() {
        this.dodaj = (req, res) => {
            let radnik = new radnik_1.default(req.body);
            radnik.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.oslobodi_radnika_posao_prostorija = (req, res) => {
            radnik_1.default.updateMany({ 'angazovan': req.body.angazovan,
                'prostorija': req.body.prostorija }, { $set: {
                    'angazovan': "",
                    'prostorija': -1
                } }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.azuriraj = (req, res) => {
            radnik_1.default.updateOne({ "_id": req.body._id }, { $set: {
                    'ime': req.body.ime, 'prezime': req.body.prezime, 'telefon': req.body.telefon,
                    'imejl': req.body.imejl, 'specijalizacija': req.body.specijalizacija, 'angazovan': req.body.angazovan,
                    'prostorija': req.body.prostorija
                } }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.obrisi = (req, res) => {
            radnik_1.default.deleteMany({ "_id": req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvati_sve_za_agenciju = (req, res) => {
            radnik_1.default.find({ "agencija": req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.dodaj_zahtev_za_radna_mesta = (req, res) => {
            let zahtev = new zahtev_radna_mesta_1.default(req.body);
            zahtev.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dohvati_zahteve_za_radna_mesta = (req, res) => {
            zahtev_radna_mesta_1.default.find({}, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.dohvati_zahteve_za_radna_mesta_za_agenciju = (req, res) => {
            zahtev_radna_mesta_1.default.find({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.azuriraj_zahtev_za_radnim_mestom = (req, res) => {
            zahtev_radna_mesta_1.default.updateOne({ '_id': req.body._id }, { $set: { 'status': req.body.status } }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
    }
}
exports.RadnikController = RadnikController;
//# sourceMappingURL=radnik.controller.js.map