"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    br_telefona: {
        type: Number
    },
    imejl: {
        type: String
    },
    uloga: {
        type: String
    },
    dodatno: {
        type: Object
    },
    profilna_slika: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    odbijen: {
        type: Boolean
    },
    blokiran: {
        type: Boolean
    },
    datum: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('KorisnikModel', Korisnik, 'korisnici');
//# sourceMappingURL=korisnik.js.map