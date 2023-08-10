"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const objekat_controller_1 = require("../controllers/objekat.controller");
const objekatRouter = express_1.default.Router();
objekatRouter.route('/dodaj').post((req, res) => new objekat_controller_1.ObjekatController().dodaj(req, res));
objekatRouter.route('/dohvati_sve_za_korisnika').post((req, res) => new objekat_controller_1.ObjekatController().dohvati_sve_za_korisnika(req, res));
objekatRouter.route('/brisanje').post((req, res) => new objekat_controller_1.ObjekatController().obrisi(req, res));
objekatRouter.route('/dohvati_jedan').post((req, res) => new objekat_controller_1.ObjekatController().dohvati_jedan(req, res));
objekatRouter.route('/azuriraj').post((req, res) => new objekat_controller_1.ObjekatController().azuriraj(req, res));
exports.default = objekatRouter;
//# sourceMappingURL=objekat.router.js.map