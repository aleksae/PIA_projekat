"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosaoController = void 0;
const posao_1 = __importDefault(require("../models/posao"));
const zahtev_otkazivanje_1 = __importDefault(require("../models/zahtev-otkazivanje"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const posao_2 = __importDefault(require("../models/posao"));
class PosaoController {
    constructor() {
        this.dodaj = (req, res) => {
            let posao = new posao_1.default(req.body);
            posao.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.azuriraj = (req, res) => {
            posao_1.default.updateOne({ '_id': req.body._id }, { $set: { 'status': req.body.status, 'agencija': req.body.agencija, 'agencija_ime': req.body.agencija_ime,
                    'klijent': req.body.klijent, 'objekat': req.body.objekat, 'ponuda': req.body.ponuda, 'pocetak': req.body.pocetak, 'kraj': req.body.kraj, 'placen': req.body.placen } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dohvati_sve_ = (req, res) => {
            posao_1.default.find({}, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.dohvati_sve_za_klijenta = (req, res) => {
            posao_1.default.find({ 'klijent': req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.dohvati_sve_za_agenciju = (req, res) => {
            posao_1.default.find({ 'agencija': req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.zahtev_otkazivanje = (req, res) => {
            let zahtev = new zahtev_otkazivanje_1.default(req.body);
            zahtev.save((err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dohvati_zahtev_za_otkazivanjem = (req, res) => {
            zahtev_otkazivanje_1.default.find({ 'posao': req.body.id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json(resp);
            });
        };
        this.azuriraj_zahtev_za_otkazivanjem = (req, res) => {
            zahtev_otkazivanje_1.default.updateOne({ '_id': req.body._id }, { $set: { 'status': req.body.status } }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else {
                    //obrada
                    korisnik_1.default.find({}, (err, resp) => {
                        for (let a of resp) {
                            if (a['uloga'] == 'agencija') {
                                posao_2.default.find({ 'agencija': a['korisnicko_ime'] }, (err, respp) => {
                                    var cnt = 0;
                                    let br = 0;
                                    let max = respp.length;
                                    for (let p of respp) {
                                        console.log(p['_id'].toString());
                                        zahtev_otkazivanje_1.default.find({ posao: p['_id'].toString(), status: 'Одобрен' }, (err, zaht) => {
                                            if (zaht) {
                                                cnt += zaht.length;
                                            }
                                            if (br == (max - 1)) {
                                                if (cnt >= 3) {
                                                    korisnik_1.default.updateOne({ 'korisnicko_ime': a['korisnicko_ime'] }, { $set: { 'blokiran': true, 'datum': new Date() } }, (err, ack) => {
                                                    });
                                                    for (let pp of respp) {
                                                        zahtev_otkazivanje_1.default.deleteOne({ posao: pp['_id'].toString(), 'status': 'Одобрен' }, (err, ackk) => {
                                                        });
                                                    }
                                                }
                                            }
                                            br++;
                                        });
                                    }
                                });
                            }
                        }
                    });
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.obrisi = (req, res) => {
            posao_1.default.deleteOne({ '_id': req.body._id }, (err, resp) => {
                if (err) {
                    res.status(400).json({ "message": "err" });
                }
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.PosaoController = PosaoController;
//# sourceMappingURL=posao.controller.js.map