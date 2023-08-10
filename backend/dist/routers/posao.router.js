"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posao_controller_1 = require("../controllers/posao.controller");
const posaoRouter = express_1.default.Router();
posaoRouter.route('/dodaj').post((req, res) => new posao_controller_1.PosaoController().dodaj(req, res));
posaoRouter.route('/sve_za_klijenta').post((req, res) => new posao_controller_1.PosaoController().dohvati_sve_za_klijenta(req, res));
posaoRouter.route('/sve_za_agenciju').post((req, res) => new posao_controller_1.PosaoController().dohvati_sve_za_agenciju(req, res));
posaoRouter.route('/zahtev_za_otkazivanjem').post((req, res) => new posao_controller_1.PosaoController().zahtev_otkazivanje(req, res));
//dohvati_zahtev_za_otkazivanjem
posaoRouter.route('/dohvati_zahtev_za_otkazivanjem').post((req, res) => new posao_controller_1.PosaoController().dohvati_zahtev_za_otkazivanjem(req, res));
posaoRouter.route('/azuriraj').post((req, res) => new posao_controller_1.PosaoController().azuriraj(req, res));
posaoRouter.route('/obrisi').post((req, res) => new posao_controller_1.PosaoController().obrisi(req, res));
posaoRouter.route('/sve').post((req, res) => new posao_controller_1.PosaoController().dohvati_sve_(req, res));
posaoRouter.route('/azuriraj_zahtev_za_otkazivanjem').post((req, res) => new posao_controller_1.PosaoController().azuriraj_zahtev_za_otkazivanjem(req, res));
exports.default = posaoRouter;
//# sourceMappingURL=posao.router.js.map