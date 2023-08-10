"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const radnik_controller_1 = require("../controllers/radnik.controller");
const radnikRouter = express_1.default.Router();
radnikRouter.route('/dodaj').post((req, res) => new radnik_controller_1.RadnikController().dodaj(req, res));
radnikRouter.route('/azuriraj').post((req, res) => new radnik_controller_1.RadnikController().azuriraj(req, res));
radnikRouter.route('/obrisi').post((req, res) => new radnik_controller_1.RadnikController().obrisi(req, res));
radnikRouter.route('/dohvati_sve_za_agenciju').post((req, res) => new radnik_controller_1.RadnikController().dohvati_sve_za_agenciju(req, res));
radnikRouter.route('/dodaj_zahtev_za_radna_mesta').post((req, res) => new radnik_controller_1.RadnikController().dodaj_zahtev_za_radna_mesta(req, res));
radnikRouter.route('/dohvati_zahteve_za_radna_mesta_za_agenciju').post((req, res) => new radnik_controller_1.RadnikController().dohvati_zahteve_za_radna_mesta_za_agenciju(req, res));
radnikRouter.route('/dohvati_zahteve_za_radna_mesta').post((req, res) => new radnik_controller_1.RadnikController().dohvati_zahteve_za_radna_mesta(req, res));
radnikRouter.route('/oslobodi_radnika_posao_prostorija').post((req, res) => new radnik_controller_1.RadnikController().oslobodi_radnika_posao_prostorija(req, res));
radnikRouter.route('/azuriraj_zahtev_za_radnim_mestom').post((req, res) => new radnik_controller_1.RadnikController().azuriraj_zahtev_za_radnim_mestom(req, res));
//dohvati_zahtev_za_otkazivanjem
exports.default = radnikRouter;
//# sourceMappingURL=radnik.router.js.map