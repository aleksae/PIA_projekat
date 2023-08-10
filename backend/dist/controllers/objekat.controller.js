"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjekatController = void 0;
const objekat_1 = __importDefault(require("../models/objekat"));
class ObjekatController {
    constructor() {
        this.dodaj = (req, res) => {
            let objekat = new objekat_1.default(req.body);
            objekat.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvati_sve_za_korisnika = (req, res) => {
            objekat_1.default.find({ 'korisnik': req.body.korisnik }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.obrisi = (req, res) => {
            objekat_1.default.deleteOne({ '_id': req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvati_jedan = (req, res) => {
            objekat_1.default.find({ '_id': req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.azuriraj = (req, res) => {
            objekat_1.default.updateOne({ '_id': req.body._id }, { 'tip': req.body.tip, 'adresa': req.body.adresa, 'kvadratura': req.body.kvadratura,
                'broj_prostorija': req.body.broj_prostorija, 'sirina_kanvasa': req.body.sirina_kanvasa, 'korisnik': req.body.korisnik, 'prostorije': req.body.prostorije }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.ObjekatController = ObjekatController;
//# sourceMappingURL=objekat.controller.js.map